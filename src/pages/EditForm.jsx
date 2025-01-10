import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import Dropdown from "../components/Dropdown";
import { Link } from "react-router-dom";


export default function EditForm() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms)
    const [formData, setFormData] = useState({...form});

    // Fetch dropdown options:
    const fetchEventTypes = async () => {
        const response = await fetch("http://localhost:8125/forms/events");
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    };
    
    const fetchGradeFormats = async () => {
        const response = await fetch("http://localhost:8125/forms/grade-formats");
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
    };

    // Update our local state object with user input:
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // Submit the update:
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return(
        <article>
            <section>
                <form onSubmit={handleSubmit}>
                <h2>Edit Form</h2>
                <fieldset>
                    <legend>Request Status Details</legend>
                    <div className="form--fields--container">
                        <div className="form--field">
                            <label htmlFor="formId">Form Id</label>
                            <input 
                                type="text"
                                name="id"
                                value={formData.id}
                                disabled
                            />
                        </div>
                        <div className="form--field">
                            <label htmlFor="urgent">Urgent</label>
                            <input 
                                type="text"
                                name="urgent"
                                value={formData.urgent}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form--fields--container">
                        <div className="form--field">
                            <label htmlFor="status">Status</label>
                            <input 
                                type="text"
                                name="status"
                                value={formData.status}
                                disabled
                            />
                        </div>
                    </div>
                    {form.status === "DENIED" ? 
                        <div className="form--fields--container">
                            <div className="form--field">
                                <label htmlFor="reasonDenied">Reason Denied</label>
                                <input 
                                    type="textarea"
                                    name="reasonDenied"
                                    value={formData.reasonDenied}
                                    disabled
                                />
                            </div>
                        </div>
                    : null}
                </fieldset>
                <fieldset>
                    <legend>General Event Details</legend>
                    <div className="form--fields--container">
                    <div className="form--field">
                            <label htmlFor="date">Event Start Date<span style={{color: 'red'}}>*</span></label>
                            <input 
                                className="time--date--field"
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="YYYY-MM-DD"
                                aria-label="Enter event start date"
                                required
                            />
                        </div>
                        <div className="form--field">
                            <label htmlFor="time">Event Start Time<span style={{color: 'red'}}>*</span></label>
                            <input 
                                className="time--date--field"
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                placeholder="HH:mm"
                                aria-label="Enter event starting time"
                                required
                            />
                        </div>
                    </div>
                    <div className="form--field">
                        <label htmlFor="location">Location<span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            aria-label="Enter event location"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Brief description of the event<span style={{color: 'red'}}>*</span></label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            aria-label="Enter event description"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Work-related Details</legend>
                    <div className="form--field">
                        <Dropdown
                            label="Event Type"
                            name="eventType"
                            value={formData.eventType}
                            onChange={handleChange}
                            fetchOptions={fetchEventTypes}
                            required
                            transformOption={option => option.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                        />
                    </div>
                    <div className="form--fields--container">
                        <div className="form--field">
                            <Dropdown
                                label="Grade Format"
                                name="gradeFormat"
                                value={formData.gradeFormat}
                                onChange={handleChange}
                                fetchOptions={fetchGradeFormats}
                                required
                                transformOption={option => option.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                            />
                        </div>
                        <div className="form--field">
                            <label htmlFor="passingGrade">Passing Grade</label>
                            <input 
                                type="text"
                                name="passingGrade"
                                value={formData.passingGrade}
                                onChange={handleChange}
                                aria-label="Select grade needed to pass"
                            />
                        </div>
                    </div>
                    <div className="form--fields--container">
                        <div className="form--field">
                            <label htmlFor="cost">Cost<span style={{color: 'red'}}>*</span></label>
                            <input 
                                type="number"
                                step={0.01}
                                name="cost"
                                value={formData.cost}
                                onChange={handleChange}
                                aria-label="Enter event cost"
                                required
                            />
                        </div>
                        <div className="form--field">
                            <label htmlFor="reimbursement">Projected Reimbursement</label>
                            <input 
                                type="number"
                                step={0.01}
                                name="reimbursement"
                                value={formData.reimbursement}
                                disabled
                            />
                        </div>
                        <div className="form--field">
                            <label htmlFor="excessFundsApproved">Excess Funds Approved</label>
                            <input 
                                type="text"
                                name="excessFundsApproved"
                                value={formData.excessFundsApproved}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="form--field">
                    <label htmlFor="hoursMissed">Work Hours to be Missed</label>
                    <input 
                        type="number"
                        name="hoursMissed"
                        value={formData.hoursMissed}
                        onChange={handleChange}
                        aria-label="Enter work hours that will be missed"
                    />
                    </div>
                    <div>
                        <label htmlFor="justification">Justification<span style={{color: 'red'}}>*</span></label>
                        <textarea 
                            name="justification"
                            value={formData.justification}
                            onChange={handleChange}
                            aria-label="Enter work-related justification"
                            required
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Attachments</legend>
                    <div className="form--field">
                        <label htmlFor="attachment">Event Attachment</label>
                        <input
                            type="file"
                            name="attachment"
                            value={formData.attachment}
                            aria-label="Upload event-related attachment"
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="supervisorAttachment">Supervisor Preapproval</label>
                        <input
                            type="file"
                            name="supervisorAttachment"
                            value={formData.supervisorAttachment}
                            aria-label="Upload supervisor preapproval attachment"
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="departmentHeadAttachment">Department Head Preapproval</label>
                        <input
                            type="file"
                            name="departmentHeadAttachment"
                            value={formData.departmentHeadAttachment}
                            aria-label="Upload department head preapproval attachment"
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="completionAttachment">Completion Attachment</label>
                        <input
                            type="file"
                            name="completionAttachment"
                            value={formData.completionAttachment}
                            aria-label="Upload proof of completion attachment"
                        />
                    </div>
                </fieldset>
                <div className="form--fields--container">
                    <button className="form--button">Submit</button>
                    <Link to="/forms/form" className="form--button form--link">Cancel Edit</Link>
                </div>
                </form>
            </section>
        </article>
    )
}