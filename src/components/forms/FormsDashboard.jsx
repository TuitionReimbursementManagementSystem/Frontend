import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearForm, setStatus } from "../../features/forms/formSlice";


export default function FormsDashboard() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const status = useSelector(state => state.forms.status);
    const navigate = useNavigate();

    // Update status when user clicks a link:
    const setFilter = (statusValue) => {
        dispatch(setStatus(statusValue));
    };

    // Clear the current Form from the and start a new request:
    const openNewRequest = () => {
        dispatch(clearForm());
        navigate("new");
    };


    return(
        <section>
            <h2>Forms Dashboard</h2>
            <div className="form--fields--container">
                <button className="form--button" onClick={openNewRequest}>New Request</button>
                <table>
                    <thead >
                        <tr >
                            <th>My Forms</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link to="table" onClick={() => setFilter(null)}>All Forms</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="table" onClick={() => setFilter("CREATED")}>Drafts (Unsubmitted)</Link></td>
                        </tr>
                        {/* For the Link below we will either need to create a new api method or filter results on the front end */}
                        <tr>
                            <td><Link to="table" onClick={() => setFilter(null)}>Active</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="table" onClick={() => setFilter("APPROVED")}>Approved</Link></td>
                        </tr>
                        <tr>
                            <td><Link to="table" onClick={() => setFilter("DENIED")}>Denied</Link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}