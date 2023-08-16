import { useParams } from "react-router-dom"
import { API } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Reply } from "../types/Interfaces"

export default function useGetReplies() {
    const { id } = useParams()

    const fetch = async () => {
        try {
            const response = await API.get(`/replies?thread_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            return response.data
        } catch (error) {
            throw new Error("Error while getting reply data")
        }
    }

    const { data, isLoading, isError } = useQuery<Reply[]>(["replies"], fetch)

    return { data, isLoading, isError }
}