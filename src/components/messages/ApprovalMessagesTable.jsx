import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import read from "images/read.png";
import unread from "images/unread.png";
import { useEffect, useState } from "react";
import { getApprovalRequestsByUsername, markAsRead } from "../../features/messages/messageSlice";
import { getFormById } from "../../features/forms/formSlice";
import { sortedByTime } from "../../features/messages/sortedMessages";
import { formatDateTime } from "../../utils/formatDateTime";

export default function ApprovalMessagesTable() {

    // State handlers:
    const dispatch = useDispatch();
    const username = useSelector(state => state.users.currentUser);
    const approvalMessagesList = useSelector(state => state.messages.approvalMessagesList);
    const [ approvalMessages, setApprovalMessages ] = useState(sortedByTime(approvalMessagesList));
    const navigate = useNavigate();

    const format = formatDateTime;

    // When user clicks a message, mark the message as read and then navigate to the ApproveForm page:
    const handleViewMessage = async (formId) => {
        await dispatch(markAsRead({ username, formId })).unwrap();
        await dispatch(getFormById(formId)).unwrap();
        navigate("message");
    }

    // Auto-deleted messages not currently detected by redux because no event is pushed from server:
    useEffect(() => {
        dispatch(getApprovalRequestsByUsername(username));
    }, [dispatch, username]);

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
                        <td>{format(message.timeCreated)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}