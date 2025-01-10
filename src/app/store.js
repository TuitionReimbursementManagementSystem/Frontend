import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import formReducer from "../features/forms/formSlice";
import messageReducer from "../features/messages/messageSlice";

const store = configureStore({
    reducer: {
        users: userReducer,
        forms: formReducer,
        messages: messageReducer
    },
});

export default store;