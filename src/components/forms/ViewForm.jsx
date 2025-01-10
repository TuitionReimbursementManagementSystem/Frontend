import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../Dropdown";


export default function ViewForm() {

    // Define redux global state handlers:
    const dispatch = useDispatch();
    const { form, loading, error } = useSelector(state => state.forms);

    // Define local state to handle form data:
    const [formData, setFormData] = useState({...form});
    const [editing, setEditing] = useState(false);

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

    // Update local state object with user inputs:
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    // Submit updates to edit the form
    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
            <h2>{editing ? "Edit Form" : "View Form"}</h2>
            <fieldset>
                <legend>Employee Details</legend>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="username">Username<span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            aria-label="Enter username"
                            required
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="email">Email<span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-label="Enter email address"
                            required
                        />
                    </div>
                </div>
                <div className="form--fields--container">
                    <div className="form--field">
                        <label htmlFor="firstName">First name<span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            aria-label="Enter first name"
                            required
                        />
                    </div>
                    <div className="form--field">
                        <label htmlFor="lastName">Last name<span style={{color: 'red'}}>*</span></label>
                        <input 
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            aria-label="Enter last name"
                            required
                        />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>General Event Details</legend>
                <div className="form--fields--container">
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
                    <label htmlFor="hoursMissed">Work Hours to be Missed</label>
                    <input 
                        type="number"
                        name="hoursMissed"
                        value={formData.hoursMissed}
                        onChange={handleChange}
                        aria-label="Enter work hours that will be missed"
                    />
                </div>
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
            <button className="form--button" type="submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Next: Attachments'}
            </button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th>Form Id</th>
                        <th>Status</th>
                        <th>Urgent</th>
                        <th>Reason Denied</th>
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
                    <tr key={form.id}>
                        <td>{form.id}</td>
                        <td>{form.status}</td>
                        <td className={form.urgent ? "urgent" : ''}>{form.urgent ? "Yes" : "No"}</td>
                        <td>{form.reasonDenied}</td>
                        <td>{form.date}</td>
                        <td>{form.time}</td>
                        <td>{form.location}</td>
                        <td>{form.description}</td>
                        <td>{form.eventType}</td>
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
                </tbody>
            </table>
        </section>
    )
}