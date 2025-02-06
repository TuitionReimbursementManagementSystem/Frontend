import { useSelector } from "react-redux"
import { Link } from "react-router-dom";


export default function MessagesDashboard() {

    // State Handlers
    const approvalMessagesList = useSelector(state => state.messages.approvalMessagesList);

    return(
        <section>
            <ul>
                <li><Link to="approval-requests">Approval Requests</Link></li>
                <li><Link>Verification Requests</Link></li>
            </ul>
        </section>
    )
}