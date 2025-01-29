import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../config/config";
import { addMessage, setConnectionStatus, setError } from "../features/messages/messageSlice";


export const useSSE = (username) => {

    // State handlers:
    const dispatch = useDispatch();
    const [sseError, setSseError] = useState(null);

    useEffect(() => {
        // Define endpoint for source of SSE's:
        console.log("useSSE called for username: " + username);
        // Using a cache:
        const eventSource = new EventSource(`${API_URL}/messages/pending?username=${username}`);
        // Using kinesis:
        //const eventSource = new EventSource(`${API_URL}/kinesis/pending?username=${username}`);

        // When a new message arrives, parse it into an object and update
        // our messages list:
        eventSource.onmessage = (event) => {
            console.log("Incoming message: " + event);
            const data = JSON.parse(event.data);
            dispatch(addMessage(data));
        }

        eventSource.onerror = (error) => {
            console.log("Connection error: " + JSON.stringify(error));
            setSseError('Error occured with SSE connection');
            dispatch(setError('SSE connection error'));

            // If it didn't work, try to reconnect after a 5 second delay:
            if(eventSource.readyState === EventSource.CLOSED) {
                setTimeout(() => {
                    console.log("Attempting to reconnect SSE");
                    eventSource.close();
                    const newSource = new EventSource(`${API_URL}/messages/pending?username=${username}`);
                    //const newSource = new EventSource(`${API_URL}/kinesis/pending?username=${username}`);
                    newSource.onmessage = eventSource.onmessage;
                    newSource.onopen = eventSource.onopen;
                    newSource.onerror = eventSource.onerror;
                }, 5000);
            }
        }

        eventSource.onopen = () => {
            console.log("Connection established");
            dispatch(setConnectionStatus(true));
        }

        return () => {
            console.log("Terminating connection");
            eventSource.close();
            dispatch(setConnectionStatus(false));
        }

    }, [username, dispatch]);

    return { sseError };
}