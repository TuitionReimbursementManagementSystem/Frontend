import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { cancelForm } from "../../features/forms/formSlice";
import loadingIcon from "images/loading.png";
import ReadOnlyForm from "./ReadOnlyForm";


export default function ViewForm() {

    // State handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms);

    // Cancel a request form:
    const handleCancel = () => {
        dispatch(cancelForm(form.id));
    }

    return(
        <section>
            <ReadOnlyForm />
            <div className="form--fields--container">
                <Link to="/forms/edit" className="form--button form--link">{loading ? <img src={loadingIcon} className="loading--icon" /> : "Edit Form"}</Link>
                <button className="form--button" onClick={handleCancel}>{loading ? <img src={loadingIcon} className="loading--icon" /> : "Cancel Request"}</button>
            </div>
        </section>
    )
}