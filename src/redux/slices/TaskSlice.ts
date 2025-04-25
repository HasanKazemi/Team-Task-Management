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
        updateTask: (state, action:PayloadAction<Task>) => {
            const index = state.findIndex((task:Task) => task.id === action.payload.id)
            if (index !== -1) {
                state[index] = action.payload
                localStorage.setItem("tasks", JSON.stringify(state))
            }
        },
        deleteTask: (state, action:PayloadAction<number>) => {
            const filteredTasks = state.filter((task:Task) => task.id !== action.payload)
            localStorage.setItem("tasks", JSON.stringify(filteredTasks))
            return filteredTasks
        },
        doneTask: (state: Task[],action:PayloadAction<number>) => {
            const index = state.findIndex((task:Task) => task.id === action.payload)
            state[index].status = "done"
            localStorage.setItem("tasks", JSON.stringify(state))
        }
    }
})
export const { addTask, updateTask, deleteTask, doneTask } = taskSlice.actions;