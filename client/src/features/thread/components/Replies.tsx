import { Box, HStack, Image, Text, VStack, Button } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { API } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Reply } from "../types/Interfaces"
import { useParams } from "react-router-dom"

export default function Replies() {
    const { id } = useParams()

    const fetch = async () => {
        try {
            const response = await API.get(`/thread/${id}/replies`)
            return response.data
        } catch (error) {
            throw new Error("Error while getting reply data")
        }
    }

    const { data, isLoading, isError } = useQuery<Reply[]>(["replies"], fetch)

    if (isLoading) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Text>Loading...</Text>
            </Box>
        )
    }

    if (isError) {
        return (
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Text>Error while fetching the data</Text>
            </Box>
        )
    }

    return (
        <Box
            m={5}
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            gap={5}
        >
            {data.map((item: Reply, index: number) => (
                <HStack key={index} alignItems='top' gap={5} borderBottom='1px' pb={5}>
                    <Image src={item.user.avatar} alt="User Profile Picture" borderRadius='full' boxSize='3rem' objectFit='cover' />
                    <Box display='flex' flexDirection='column' gap={1}>
                        <HStack>
                            <Text>{item.user.full_name}</Text>
                            <Text>@{item.user.username}</Text>
                            <Text>·</Text>
                            {/* format created at to duration later */}
                            <Text>{item.created_at} ago</Text>
                        </HStack>
                        <VStack alignItems='start'>
                            <Text>{item.content}</Text>
                            <Image src={item?.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                        </VStack>
                        <Box display='flex' gap={5} mt={4}>
                            {item.is_liked ?
                                <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{item.number_of_likes}</Button>
                                :
                                <Button variant={"ghost"} leftIcon={<Heart />}>{item.number_of_likes}</Button>}
                            <Button variant={"ghost"} leftIcon={<ChatSquareText />}>Reply</Button>
                        </Box>
                    </Box>
                </HStack>
            ))}
        </Box>
    )
}