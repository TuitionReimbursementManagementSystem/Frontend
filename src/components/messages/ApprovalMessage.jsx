import { useDispatch, useSelector } from "react-redux";
import ReadOnlyForm from "../forms/ReadOnlyForm";
import { supervisorApproval } from "../../features/forms/formSlice";
import { useNavigate } from "react-router-dom";
import { getApprovalRequestsByUsername } from "../../features/messages/messageSlice";


export default function ApprovalMessage() {

    // State handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms);
    const username = useSelector(state => state.users.currentUser);
    const navigate = useNavigate();

    // If the currentUser is not a BENCO or Department Head, they can grant approval as a Supervisor:
    const handleSupervisorApprove = async () => {
        let id = form.id;
        await dispatch(supervisorApproval({id, username})).unwrap();
        if(!error) {
            await dispatch(getApprovalRequestsByUsername(username)).unwrap();
        }
        navigate("/messages/approval-requests");
    }

    return(
        <section>
            <ReadOnlyForm />
            
            <div className="form--fields--container">
                <button className="form--button" onClick={handleSupervisorApprove} disabled={loading}>
                    {loading ? 'Loading...' : 'Approve Request'}
                </button>

            </div> 
            {error && <p className="error">{ error }</p>}
        </section>
    );
}