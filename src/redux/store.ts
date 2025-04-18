import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { projectSlice } from "./slices/ProjectSlice";

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        projects: projectSlice.reducer,
    }
})