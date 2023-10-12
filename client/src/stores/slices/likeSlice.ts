import { createSlice } from "@reduxjs/toolkit";
import { Thread } from "../../interfaces/featureInterfaces";

const initialLikeState: Thread = {
  id: 0,
  content: "",
  image: "",
  user: { id: 0, full_name: "", username: "", email: "" },
  likes: [],
  is_liked: false,
  replies: [],
  created_at: ""
}

export const likeSlice = createSlice({
  name: "likes",
  initialState: initialLikeState,
  reducers: {
    SET_THREAD_LIKE: (state, action) => {
      const payload = action.payload
      const { thread_id, user } = payload
      const hasLiked = state.likes?.some(
        like => like.thread.id === thread_id && like.user.id === user.id
      )
      if (hasLiked) {
        state.likes = state.likes?.filter(
          like => like.thread.id !== thread_id || like.user.id !== user.id
        )
      } else {
        state.likes?.push(payload)
      }
    }
  }
})