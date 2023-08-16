import { useParams } from "react-router-dom"
import { API } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Thread } from "../types/Interfaces"

export default function useGetThread() {
 const { id } = useParams()

 const fetch = async () => {
  try {
   const response = await API.get(`/thread/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.token}`
    }
   })
   return response.data
  } catch (error) {
   throw new Error("Error while getting this thread datum")
  }
 }

 const { data, isLoading, isError } = useQuery<Thread>(["thread", id], fetch)

 return { data, isLoading, isError }
}