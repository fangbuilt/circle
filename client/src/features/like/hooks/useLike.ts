import { useDispatch } from "react-redux"
import { API } from "../../../lib/api"
import { useSelector } from "react-redux"
import { RootState } from "../../../stores/types/rootState"
import { useParams } from "react-router-dom"

export default function useLike() {
  const dispatch = useDispatch()
  const like = useSelector((state: RootState) => state.like.likes)
  const { id } = useParams()
  async function handleLike() {
    try {
      const response = await API.post("/like")
      return response
    } catch (error) {
      console.log({ error: error })
    }
  }

  return { handleLike }
}