import { useParams } from "react-router-dom";
import { API } from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Thread } from "../../../interfaces/featureInterfaces";

export default function useGetUserThread() {
  const { id } = useParams()

  const fetch = async () => {
    try {
      const response = await API.get(`threads?user_id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      return response.data
    } catch (error) {
      throw new Error("Error while getting this user's thread data")
    }
  }

  const { data, isLoading, isError } = useQuery<Thread[]>(["threads"], fetch)
  return { data, isLoading, isError }
}