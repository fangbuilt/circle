import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../interfaces/featureInterfaces";
import { setAuthToken } from "../../lib/api";

const initialLikeState: { threads: Thread[] } = { threads: [] }

export const likeSlice = createSlice({
  name: "likes",
  initialState: initialLikeState,
  reducers: {
    SET_THREADS: (state, action) => {
      const payload = action.payload
      setAuthToken(payload.token)
      return {
        ...state,
        threads: payload.threads,

      }
    }
  }
})