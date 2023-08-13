import { Box, Image, Button, Text, HStack, VStack } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Thread } from "../types/Interfaces";
import { API } from "../../../lib/api";

export default function ThreadCard() {
    const fetch = async () => {
        try {
            const response = await API.get("/threads")
            return response.data
        } catch (error) {
            throw new Error("Error while getting thread data")
        }
    }

    const { data, isLoading, isError } = useQuery<Thread[]>(["threads"], fetch)

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
            {data.map((item: Thread, index: number) => (
                <HStack key={index} alignItems='top' gap={5} borderBottom='1px' pb={5}>
                    <Image src={item.user.avatar} alt="User Profile Picture" borderRadius='full' boxSize='3rem' objectFit='cover' />
                    <Box display='flex' flexDirection='column' gap={1}>
                        <HStack>
                            <Text>{item.user.full_name}</Text>
                            <Text>@{item.user.full_name}</Text>
                            <Text>·</Text>
                            {/* format created at to duration later */}
                            <Text>{item.created_at} ago</Text>
                        </HStack>
                        <VStack alignItems='start'>
                            <Link to={`/${item.id}`}>
                                <Text>{item.content}</Text>
                            </Link>
                            <Image src={item?.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                        </VStack>
                        <Box display='flex' gap={5} mt={4}>
                            {item.is_liked ?
                                <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{item.number_of_likes}</Button>
                                :
                                <Button variant={"ghost"} leftIcon={<Heart />}>{item.number_of_likes}</Button>}
                            <Button variant={"ghost"} leftIcon={<ChatSquareText />}>{item.number_of_replies} Replies</Button>
                        </Box>
                    </Box>
                </HStack>
            ))}
        </Box>
    )
}