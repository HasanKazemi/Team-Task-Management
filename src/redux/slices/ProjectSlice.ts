import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../types";

export const projectSlice = createSlice({
    name: "projects",
    initialState: JSON.parse(localStorage.getItem("projects") || "[]"),
    reducers: {
        addProject(state, action:PayloadAction<Project>) {
            state.push(action.payload);
            localStorage.setItem("projects",JSON.stringify(action.payload))
        },
    }
})
export const {addProject} = projectSlice.actions