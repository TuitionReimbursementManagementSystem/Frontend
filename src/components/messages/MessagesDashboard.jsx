import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { clearForm } from "../../features/forms/formSlice";


export default function MessagesDashboard() {

    // State Handlers
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Clear active form and navigate to Approval Requests:
    const handleClickToApprovalRequests = () => {
        dispatch(clearForm());
        navigate("approval-requests");
    }

    return(
        <section>
            <div className="form--fields--container">
                <button className="dashboard--button" onClick={handleClickToApprovalRequests}>Approval Requests</button>
                <button className="dashboard--button">Verification Requests</button>
            </div>
        </section>
    )
}