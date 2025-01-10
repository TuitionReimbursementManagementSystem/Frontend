import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function ViewForm() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms);

    return(
        <section>
            <h2>Request: {form.id}</h2>
            <fieldset>
                <legend>Request Status Details</legend>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="status">Status</label>
                        <p className="form--value">{form.status.replace(/_/g, " ")}</p>
                    </div>
                    <div className="form--field">
                        <label htmlFor="urgent">Urgent</label>
                        <p className="form--value">{form.urgent ? "Urgent" : "No"}</p>
                    </div>
                </div>
                {form.status === "DENIED" ? 
                    <div className="form--fields--container">
                        <div className="form--field">
                            <label htmlFor="reasonDenied">Reason Denied</label>
                            <p className="form--value">{form.reasonDenied}</p>
                        </div>
                    </div>
                : null}
            </fieldset>
            <fieldset>
                <legend>General Event Details</legend>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="date">Event Start Date</label>
                        <p className="form--value">{form.date}</p>
                    </div>
                    <div className="form--field">
                        <label htmlFor="time">Event Start Time</label>
                        <p className="form--value">{form.time}</p>
                    </div>
                </div>
                <div className="form--field">
                    <label htmlFor="location">Location<span style={{color: 'red'}}>*</span></label>
                    <p className="form--value">{form.location}</p>
                </div>
                <div>
                    <label htmlFor="description">Brief description of the event</label>
                    <p className="form--value">{form.description}</p>
                </div>
            </fieldset>
            <fieldset>
                <legend>Work-related Details</legend>
                <div className="form--field">
                    <p className="form--value">{form.eventType.replace(/_/g, " ")}</p>
                </div>
                <div className="form--fields--container">
                    <div className="form--field">
                        <p className="form--value">{form.gradeFormat}</p>
                    </div>
                    <div className="form--field">
                        <label htmlFor="passingGrade">Passing Grade</label>
                        <p className="form--value">{form.passingGrade}</p>
                    </div>
                </div>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="cost">Cost</label>
                        <p className="form--value">${form.cost}</p>
                    </div>
                    <div className="form--field">
                        <label htmlFor="reimbursement">Projected Reimbursement</label>
                        <p className="form--value">${form.reimbursement}</p>
                    </div>
                    <div className="form--field">
                        <label htmlFor="excessFundsApproved">Excess Funds Approved</label>
                        <p className="form--value">{form.excessFundsApproved ? "Yes" : "No"}</p>
                    </div>
                </div>
                <div className="form--field">
                    <label htmlFor="hoursMissed">Work Hours to be Missed</label>
                    <p className="form--value">{form.hoursMissed}</p>
                </div>
                <div>
                    <label htmlFor="justification">Justification</label>
                    <p className="form--value">{form.justification}</p>
                </div>
            </fieldset>
            <fieldset>
                <legend>Attachments</legend>
                <div className="form--field">
                    <label htmlFor="attachment">Event Attachment</label>
                    <p className="form--value">{form.attachment}</p>
                </div>
                <div className="form--field">
                    <label htmlFor="supervisorAttachment">Supervisor Preapproval</label>
                    <p className="form--value">{form.supervisorAttachment}</p>
                </div>
                <div className="form--field">
                    <label htmlFor="departmentHeadAttachment">Department Head Preapproval</label>
                    <p className="form--value">{form.departmentHeadAttachment}</p>
                </div>
                <div className="form--field">
                    <label htmlFor="completionAttachment">Completion Attachment</label>
                    <p className="form--value">{form.completionAttachment}</p>
                </div>
            </fieldset>
            <div className="form--fields--container">
                <Link to="/forms/edit" className="form--button form--link">Edit Form</Link>
                <button className="form--button">Cancel Request</button>
            </div>
        </section>
    )
}