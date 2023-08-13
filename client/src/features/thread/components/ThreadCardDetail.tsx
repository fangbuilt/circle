import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { API } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Thread } from "../types/Interfaces"
import { useParams } from "react-router-dom"

export default function ThreadCardDetail() {
    const { id } = useParams()

    const fetch = async () => {
        try {
            const response = await API.get(`/thread/${id}`)
            return response.data
        } catch (error) {
            throw new Error("Error while getting this thread datum")
        }
    }

    const { data, isLoading, isError } = useQuery<Thread>(["thread", id], fetch)

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

    const item = data

    return (
        <Box
            m={5}
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            gap={5}>
            <VStack alignItems='top' gap={5} pb={5}>
                <HStack>
                    <Image src={item.user.avatar} alt="User Profile Picture" borderRadius='full' boxSize='3rem' objectFit='cover' />
                    <VStack alignItems='start' gap={0}>
                        <Text>{item.user.full_name}</Text>
                        <Text>@{item.user.username}</Text>
                    </VStack>
                </HStack>
                <Box display='flex' flexDirection='column' gap={1}>
                    <VStack alignItems='start'>
                        <Text>{item.content}</Text>
                        <Image src={item?.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                    </VStack>
                    <HStack mt={5}>
                        {/* format as time HH:MM AM */}
                        <Text>{item.created_at}</Text>
                        <Text>·</Text>
                        {/* format as date Mon DD, YYYY */}
                        <Text>{item.created_at}</Text>
                    </HStack>
                    <Box display='flex' gap={5} mt={4}>
                        {item.is_liked ?
                            <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{item.number_of_likes}</Button>
                            :
                            <Button variant={"ghost"} leftIcon={<Heart />}>{item.number_of_likes}</Button>
                        }
                        <Button variant={"ghost"} leftIcon={<ChatSquareText />}>{item.number_of_replies} Replies</Button>
                    </Box>
                </Box>
            </VStack>
        </Box>
    )
}