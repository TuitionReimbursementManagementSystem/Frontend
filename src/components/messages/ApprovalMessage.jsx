import { useDispatch, useSelector } from "react-redux";
import ReadOnlyForm from "../forms/ReadOnlyForm";


export default function ApprovalMessage() {

    // State handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms);

    const handleChange = () => {};

    const handleSubmit = () => {};

    console.log("Form: " + JSON.stringify(form));

    return(
        <section>
            <ReadOnlyForm />
            
            <button className="form--button" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Next: Attachments'}
            </button>
            {error && <p className="error">{ error }</p>}
        </section>
    );
}