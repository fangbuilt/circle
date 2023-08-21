import { createSlice } from "@reduxjs/toolkit"
import { setAuthToken } from "../../lib/api";
import { User } from "../../interfaces/featureInterfaces";

const initialAuthState: User = {
  id: 0,
  full_name: "",
  username: "",
  email: "",
  avatar: "",
  bio: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload
      setAuthToken(payload.token)
      localStorage.setItem("token", payload.token)
      const current: User = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email,
        avatar: payload.avatar,
        bio: payload.bio
      }
      return current
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload
      setAuthToken(payload.token)
      const current: User = {
        id: payload.id,
        full_name: payload.full_name,
        username: payload.username,
        email: payload.email
      }
      return current
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token")
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token")
      return initialAuthState
    },

  }
})