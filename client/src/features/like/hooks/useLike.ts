import { useSelector } from "react-redux";
import { API, setAuthToken } from "../../../lib/api";
import { useState } from "react"
import { RootState } from "../../../stores/types/rootState";
import { Thread } from "../../../interfaces/featureInterfaces";

export default function useLike() {
  const [isLiked, setIsLiked] = useState(false)
  const auth = useSelector((state: RootState) => state.auth)
  const [thread, setThread] = useState<Partial<Thread>>({})

  async function handleLike(thread_id: number, user_id: number = auth.id) {
    console.log("Handling like for thread ID:", thread_id)
    try {
      setIsLiked(true)
      setAuthToken(localStorage.token)
      const response = await API.post("/like", { thread_id: thread_id, user_id: user_id })
      setThread(prevThread => ({
        ...prevThread,
        likes: response.data.likes
      }))
    } catch (error) {
      console.log(`Failed to like thread ${thread_id}`, error)
      setIsLiked(false)
    }
  }

  async function handleUnlike(thread_id: number, user_id: number = auth.id) {
    console.log("Handling unlike for thread ID:", thread_id)
    try {
      setIsLiked(false)
      setAuthToken(localStorage.token)
      const response = await API.delete(`/unlike/${thread_id}`, { data: { user_id: user_id } })
      setThread(prevThread => ({
        ...prevThread,
        likes: response.data.likes
      }))
    } catch (error) {
      console.log(`Failed to unlike thread ${thread_id}`, error)
      setIsLiked(true)
    }
  }

  return { thread, isLiked, handleLike, handleUnlike }
}