import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUserForms, setForm } from "../../features/forms/formSlice";
import { Link } from "react-router-dom";


export default function FormsTable() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const { userForms, status } = useSelector(state => state.forms);
    const currentUser = useSelector(state => state.users.currentUser);

    // Fetch all forms created by currently logged in user:
    useEffect(() => {
        if(currentUser) {
            dispatch(getUserForms({currentUser, status}));
        }
    },[dispatch, currentUser, status]);

    // When user clicks the Link to view an individual Form, we need to update our store object before we go there:
    const handleClick = (form) => {
        dispatch(setForm(form));
    }

    return(
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Form Id</th>
                        <th>Status</th>
                        <th>Urgent</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Event Type</th>
                        <th>Grade Format</th>
                        <th>Passing Grade</th>
                        <th>Cost</th>
                        <th className="reimbursement">Projected Reimbursement</th>
                        <th>Excess Funds Approved</th>
                        <th>Work Hours to be Missed</th>
                        <th>Justification</th>
                        <th>Event Attachment</th>
                        <th>Supervisor Preapproval</th>
                        <th>Department Head Preapproval</th>
                        <th>Proof of Completion</th>
                    </tr>
                </thead>
                <tbody>
                    {userForms.map(form => {
                        return(
                            <tr key={form.id}>
                                <td><Link to="/forms/form" onClick={() => handleClick(form)}>{form.id}</Link></td>
                                <td>{form.status.replace(/_/g, " ")}</td>
                                <td className={form.urgent ? "urgent" : ''}>{form.urgent ? "Yes" : "No"}</td>
                                <td>{form.date}</td>
                                <td>{form.time}</td>
                                <td>{form.location}</td>
                                <td>{form.description}</td>
                                <td>{form.eventType.replace(/_/g, " ")}</td>
                                <td>{form.gradeFormat}</td>
                                <td>{form.passingGrade}</td>
                                <td className="cost">{form.cost}</td>
                                <td className="reimbursement">{form.reimbursement}</td>
                                <td>{form.excessFundsApproved ? "Yes" : "No"}</td>
                                <td>{form.hoursMissed}</td>
                                <td>{form.justification}</td>
                                <td>{form.attachment}</td>
                                <td>{form.supervisorAttachment}</td>
                                <td>{form.departmentHeadAttachment}</td>
                                <td>{form.completionAttachment}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    )
}