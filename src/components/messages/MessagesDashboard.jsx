import { useSelector } from "react-redux"
import { Link } from "react-router-dom";


export default function MessagesDashboard() {

    const { approvalMessagesList } = useSelector(state => state.messages);

    return(
        <section>
            <ul>
                <li><Link>Approval Requests</Link></li>
                <li><Link>Verification Requests</Link></li>
            </ul>
        </section>
    )
}