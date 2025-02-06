import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/config";

// Get all of a user's approval request messages:
export const getApprovalRequestsByUsername = createAsyncThunk(
    'messages/getApprovalRequestsByUsername',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/messages/approval-requests`,
                {
                    headers: { username }
                }
            );
            return response.data;
        } catch(error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Mark message as read:
export const markAsRead = createAsyncThunk(
    'messages/markAsRead',
    async ({ username, formId }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/messages/${formId}`,
                null,
                { 
                    headers: { username } 
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        approvalMessagesList: [],
        loading: false,
        error: null,
        sseConnection: null
    },
    reducers: {
        addMessage(state, action) {
            state.approvalMessagesList.unshift(action.payload);
        },
        setConnectionStatus(state, action) {
            state.sseConnection = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            // Get all approval messages for user:
            .addCase(getApprovalRequestsByUsername.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getApprovalRequestsByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.approvalMessagesList = action.payload;
            })
            .addCase(getApprovalRequestsByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update a message as read:
            .addCase(markAsRead.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markAsRead.fulfilled, (state, action) => {
                state.loading = false;
                const updatedMessage = action.payload;
                const messageIndex = state.approvalMessagesList.findIndex(message => message.formId === updatedMessage.formId);
                if(messageIndex != -1) {
                    state.approvalMessagesList[messageIndex] = updatedMessage;
                }
            })
            .addCase(markAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const { addMessage, setConnectionStatus, setError } = messageSlice.actions;

export default messageSlice.reducer;