import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodeToken } from "../../jwt/mockToken";
import { User } from "../../types";

export interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState : AuthState = {
    token: sessionStorage.getItem("token") || null,
    user: null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state,action:PayloadAction<string>){
            const token = action.payload
            const decoded = decodeToken(token)
            if (decoded) {
                state.token = token
                state.user = decoded
                sessionStorage.setItem("token",token)
            }
        }
    }
})
export const {login} = authSlice.actions