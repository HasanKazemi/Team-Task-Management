import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

const initialAdmins : User[] = [
    {
        id: 1,
        name: "HasanKazemi",
        password: "1234",
        email: "avatarhasan78@gmail.com",
        role: "admin"
    },
    {
        id: 2,
        name: "MelikaDehlany",
        password: "1234",
        email: "",
        role: "admin"
    },
]

const initialState = JSON.parse(localStorage.getItem("users")!) || initialAdmins

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser(state, action:PayloadAction<User>){
            state.push(action.payload)
            localStorage.setItem("users", JSON.stringify(state))
        }
    }
})
export const userActions = userSlice.actions;