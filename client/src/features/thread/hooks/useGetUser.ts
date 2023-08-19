import { useParams } from "react-router-dom";
import { API } from "../../../lib/api";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../interfaces/featureInterfaces";

export default function useGetUser() {
  const { id } = useParams()

  const fetch = async () => {
    try {
      const response = await API.get(`/user/${id}`)
      return response.data
    } catch (error) {
      throw new Error("Error while getting this user datum")
    }
  }

  const { data } = useQuery<User>(["user", id], fetch)

  return { data }
}