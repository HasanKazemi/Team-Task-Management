import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/UserSlice";
import { projectSlice } from "./slices/ProjectSlice";
import { taskSlice } from "./slices/TaskSlice";

export const store = configureStore({
    reducer: {
        users: userSlice.reducer,
        projects: projectSlice.reducer,
        tasks: taskSlice.reducer,
    }
})