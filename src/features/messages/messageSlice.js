import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/config";

// Get all of a user's approval request messages:
export const getApprovalRequestMessagesByUsername = createAsyncThunk(
    'messages/getApprovalRequestMessagesByUsername',
    async (username, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/messages/pending-my-approval`,
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


const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        approvalMessagesList: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(getApprovalRequestMessagesByUsername.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getApprovalRequestMessagesByUsername.fulfilled, (state, action) => {
                state.loading = false;
                state.approvalMessagesList = action.payload;
            })
            .addCase(getApprovalRequestMessagesByUsername.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default messageSlice.reducer;