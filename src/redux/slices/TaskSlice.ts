import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types";

export const taskSlice = createSlice({
    name: "tasks",
    initialState: JSON.parse(localStorage.getItem("tasks") || "[]"),
    reducers: {
        addTask: (state, action:PayloadAction<Task>) => {
            state.push(action.payload)
            localStorage.setItem("tasks", JSON.stringify(state))
        },
        deleteTask: (state, action:PayloadAction<number>) => {
            const filteredTasks = state.filter((task:Task) => task.id !== action.payload)
            localStorage.setItem("tasks", JSON.stringify(filteredTasks))
            return filteredTasks
        }
    }
})
export const { addTask, deleteTask } = taskSlice.actions;