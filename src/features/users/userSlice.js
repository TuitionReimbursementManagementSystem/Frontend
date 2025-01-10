import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config/config";

// Register new user:
export const registerUser = createAsyncThunk(
    'users/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Get all users (for dev purposes only):
export const getAllUsers = createAsyncThunk(
    'users/getAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState: {
        loading: false,
        error: null,
        user: null,
        userList: [],
        currentUser: null
    },
    reducers: {
        setCurrentUser(state, action) {
            const {username, password} = action.payload;
            state.currentUser = username;
        },
        logout(state) {
            state.currentUser = null;
        }
    },
    extraReducers: builder => {
        builder

            // Register new user:
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get list of all users:
            .addCase(getAllUsers.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Set currently logged in user:
            .addCase('users/setUser', (state, action) => {
                state.currentUser = action.payload;
            })
    },
});

export const { setCurrentUser, logout } = userSlice.actions;

export default userSlice.reducer;