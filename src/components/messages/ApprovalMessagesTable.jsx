import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import read from "images/read.png";
import unread from "images/unread.png";
import { getApprovalMessagesSortedByDate } from "../../features/messages/sortedMessages";
import { useEffect, useState } from "react";
import { markAsRead } from "../../features/messages/messageSlice";
import { getFormById } from "../../features/forms/formSlice";


export default function ApprovalMessagesTable() {

    // State handlers:
    const dispatch = useDispatch();
    const username = useSelector(state => state.users.currentUser);
    const form = useSelector(state => state.forms.form);
    const sortedByTime = useSelector(getApprovalMessagesSortedByDate);
    const [ approvalMessages, setApprovalMessages ] = useState(sortedByTime);
    const navigate = useNavigate();


    // Format our LocalDateTime string to display either the time (HH:mm) if sent today or the date if sent prior:
    const formatDateTime = (localDateTime) => {
        //                       Year                   Month             Day               Hour             Minute
        let date = new Date(localDateTime[0], localDateTime[1] - 1, localDateTime[2], localDateTime[3], localDateTime[4]);

        // Compare with today's date to determine if we should render as date or time:
        let today = new Date();
        let isToday = date.toDateString() === today.toDateString();

        if(isToday) {
            // Ensure our minutes/hours string is two characters long, padding with a leading 0 if necessary:
            let hours = date.getHours().toString().padStart(2, '0');
            let minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        } 
        
        // Split our date into abbreviated Month Day Year, ex: Feb 5 2025
        let day = date.getDate();
        let month = date.toLocaleString('en-US', { month: 'short'} );
        let year = date.getFullYear();
        // If the message was sent this year, only display date in Mmm dd format, no padding:
        if (year === today.getFullYear()) {
            return `${month} ${day}`;
        }

        // Otherwise, return MMM dd yyyy:
        return `${month} ${day} ${year}`;
    }

    // When user clicks a message, mark the message as read and then navigate to the ApproveForm page:
    const handleViewMessage = (formId) => {
        dispatch(markAsRead({ username, formId }));
        dispatch(getFormById(formId));
    }

    // Once the form has been loaded, navigate to the approval page to view it:
    useEffect(() => {
        if(form) {
            navigate("message");
        }
    }, [dispatch, form])

    return(
        <table>
            <thead>
                <tr>
                    <th>Form</th>
                    <th>From</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                { approvalMessages.map(message =>
                    <tr key={message.formId}>
                        <td>
                            <button className="message--table--button" onClick={() => handleViewMessage(message.formId)}>
                                <img src={message.viewed ? read : unread} className="message--icon" alt={message.viewed ? "Read message icon" : "Unread message icon"} />
                                {message.formId}
                            </button>
                        </td>
                        <td>{message.requester}</td>
                        <td>{formatDateTime(message.timeCreated)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}