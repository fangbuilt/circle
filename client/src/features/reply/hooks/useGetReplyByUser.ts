import { useParams } from "react-router-dom";
import { API } from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Reply } from "../../../interfaces/featureInterfaces";

export default function useGetReplyByUser() {
  const { id } = useParams()

  const fetch = async () => {
    try {
      const response = await API.get(`/replies?user_id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
      return response.data
    } catch (error) {
      throw new Error("Error while getting reply data from this user")
    }
  }

  const { data, isLoading, isError } = useQuery<Reply[]>(["replies"], fetch)

  return { data, isLoading, isError }
}