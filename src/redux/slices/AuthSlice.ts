import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

export interface Auth {
    isAuthenticated: boolean;
    currentUser: User | null;
}

const initialValue : Auth = {
    isAuthenticated: false,
    currentUser: null
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialValue,
    reducers: {
        login(state,action:PayloadAction<User>){
            console.log(action.payload);
            state.isAuthenticated = true
        }
    }
})
export const {login} = authSlice.actions