import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setLoading, submitForm, updateAttachment } from "../../features/forms/formSlice";
import { API_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";


export default function AttachmentsForm() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const { loading, error, form } = useSelector(state => state.forms);
    const currentUser = useSelector(state => state.users.currentUser);
    const navigate = useNavigate();

    // Define local state to handle the attachment files being uploaded:
    const [attachments, setAttachments] = useState({
        attachment: form?.attachment,
        supervisorAttachment: form?.supervisorAttachment,
        departmentHeadAttachment: form?.departmentHeadAttachment
    });

    // Map from the object keys to the enums being sent in the request:
    const attachmentTypeMapping = {
        attachment: "EVENT",
        supervisorAttachment: "SUPERVISOR_APPROVAL",
        departmentHeadAttachment: "DEPARTMENT_HEAD_APPROVAL"
    }

    // User stages a file to be uploaded:
    const handleFileChange = (event, attachmentType) => {
        setAttachments(prevAttachments => ({...prevAttachments, [attachmentType]: event.target.files[0]}));
    };

    // Call for pre-signed url and then upload the attachment:
    const handleFileUpload = async (attachmentType) => {
        // If button pressed but no file was staged, exit process:
        if(!attachments[attachmentType]) return;
        try {
            // Set loading to true to prevent multiple button presses and indicate to user that request is being worked on:
            dispatch(setLoading(true));

            // Read MIME type of file (application/pdf, image/png, etc):
            const file = attachments[attachmentType];
            let contentType = file.type;

            // The supervisorAttachment and departmentHeadAttachment are both expecting application/vnd.ms-outlook, which does not get
            // get detected. As a workaround, if no MIME type is detected we'll check to see if the file ends with a .msg extension:
            if(!contentType && file.name.toLowerCase().endsWith(".msg")) {
                contentType = "application/vnd.ms-outlook";
            }

            // Map from Form field keys to request enums:
            const attachmentTypeEnum = attachmentTypeMapping[attachmentType];

            // Request pre-signed url from api. Pass along the attachmentType (event attachment, supervisor pre-approval, etc)
            // and the contentType (MIME type) to verify that file is in an acceptable format for the type of attachment:
            const response = await axios.post(
                `${API_URL}/forms/${form.id}/attachments/url`,
                null,
                { params: { "attachmentType": attachmentTypeEnum, contentType } }
            );

            // Api should respond with an object containing both the url and a key for the attachment, which we will pass back to 
            // the api if upload succeeds:
            const { url, key } = response.data;

            // Upload file to S3 using pre-signed url. Note that the key is embedden in the url, but we still want it so that we can
            // store it in our database object to reference the attachment when we retrieve it from S3:
            await axios.put(url, file, {
                headers: {
                    "Content-Type": contentType
                }
            });

            // After successful upload, send the key back to the api so that we can update the database Form object with a reference
            // to our attachment:
            dispatch(updateAttachment({
                id: form.id,
                "attachmentType": attachmentTypeEnum,
                key
            }));

            // Update local state so that our Form now shows that it contains a reference to the attachment:
            setAttachments(prevAttachments => ({...prevAttachments, [attachmentType]: key }));

        } catch (error) {
            console.error("Error uploading attachment:", error)
        } finally {
            // dispatching updateAttachment will correctly update loading regardless of the result, but if we encounter an error that triggers
            // the catch block before the function has been called we would be stuck "loading" forever:
            dispatch(setLoading(false));
        }
    };

    // Submit the completed form to begin the approval chain process:
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(submitForm({id: form.id, "username": currentUser}));
    };

    console.log(JSON.stringify(form));

    return(
        <form onSubmit={handleSubmit}>
            <p>Form ID: {form.id}</p>
            <fieldset>
                    <legend>Optional Attachments</legend>
                    <div>
                        <label>Event Attachment</label>
                        <input 
                            type="file"
                            onChange={() => handleFileChange(event, "attachment")}
                            aria-label="Optionally attachment related to event"
                        />
                        <button type="button" onClick={() => handleFileUpload("attachment")} disabled={loading}>{loading ? "Uploading..." : "Upload Event Attachment"}</button>
                    </div>
                    <div>
                        <label>Supervisor Pre-approval</label>
                        <input 
                            type="file"
                            onChange={() => handleFileChange(event, "supervisorAttachment")}
                            aria-label="Optionally attachment supervisor pre-approval message"
                        />
                        <button type="button" onClick={() => handleFileUpload("supervisorAttachment")} disabled={loading}>{loading ? "Uploading..." : "Upload Supervisor Pre-Approval"}</button>
                    </div>
                    <div>
                        <label>Department Head Pre-approval</label>
                        <input 
                            type="file"
                            onChange={() => handleFileChange(event, "departmentHeadAttachment")}
                            aria-label="Optionally attachment department head pre-approval message"
                        />
                        <button type="button" onClick={() => handleFileUpload("departmentHeadAttachment")} disabled={loading}>{loading ? "Uploading..." : "Upload Department Head Pre-Approval"}</button>
                    </div>
                </fieldset>
                {error && <p className="error">{ error }</p>}
                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</button>
        </form>
    )
}