import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export const userSlice = createSlice({
    name: "users",
    initialState: JSON.parse(localStorage.getItem("users") || "[]"),
    reducers: {
        addUser(state, action:PayloadAction<User>){
            state.push(action.payload)
            localStorage.setItem("users", JSON.stringify(state))
        }
    }
})
export const userActions = userSlice.actions;