import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodeToken } from "../../jwt/mockToken";

export interface AuthState {
    token: string | null;
    user: string | null;
}

const initialState : AuthState = {
    token: sessionStorage.getItem("token") || null,
    user: sessionStorage.getItem('token') ? decodeToken(sessionStorage.getItem('token')!) || null : null,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state,action:PayloadAction<string>){
            const token = action.payload
            const decoded = decodeToken(token)
            console.log(typeof decoded);
            
            if (decoded) {
                state.token = token
                state.user = decoded
                sessionStorage.setItem("token",token)
            }
        },
        logout(state){
            state.token = null
            state.user = null
            sessionStorage.removeItem("token")
        }
    }
})
export const { login,logout } = authSlice.actions