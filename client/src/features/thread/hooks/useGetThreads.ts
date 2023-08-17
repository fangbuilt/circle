import { useQuery } from "@tanstack/react-query"
import { Thread } from "../../../interfaces/featureInterfaces"
import { API } from "../../../lib/api"

export default function useGetThreads() {
    const fetch = async () => {
        try {
            const response = await API.get(`/threads?limit=25`, {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`
                }
            })
            return response.data
        } catch (error) {
            throw new Error("Error while getting thread data")
        }
    }

    const { data, isLoading, isError } = useQuery<Thread[]>(["threads"], fetch)

    return { data, isLoading, isError }
}