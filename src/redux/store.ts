import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { projectSlice } from "./slices/ProjectSlice";
import { taskSlice } from "./slices/TaskSlice";
import { authSlice } from "./slices/AuthSlice";

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        projects: projectSlice.reducer,
        tasks: taskSlice.reducer,
        auth: authSlice.reducer,
    }
})