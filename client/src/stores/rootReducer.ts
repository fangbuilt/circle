import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { likeSlice } from "./slices/likeSlice";

export const { AUTH_CHECK, AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT } = authSlice.actions
export const { SET_THREADS } = likeSlice.actions

export const authReducer = authSlice.reducer
export const likeReducer = likeSlice.reducer

const rootReducer = combineReducers({
  auth: authReducer,
  like: likeReducer
})

export default rootReducer