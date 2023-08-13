import { Box, Image, Button, Text, HStack, VStack, Divider, Avatar } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Thread } from "../types/Interfaces";
import { API } from "../../../lib/api";
import { formatDistanceToNow } from "date-fns"
import React from "react";
import ErrorMessage from "../../../components/Error";
import Loading from "../../../components/Loading";

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
            <Loading />
        )
    }

    if (isError) {
        return (
            <ErrorMessage />
        )
    }

    return (
        <Box
            m={4}
            display='flex'
            justifyContent='start'
            flexDirection='column'
            alignItems='start'
            gap={4}
        >
            {data.map((thread: Thread) => (
                <React.Fragment key={thread.id}>
                    <HStack alignItems='top' gap={4}>
                        <Avatar name={thread.user.full_name} src={thread?.user.avatar} />
                        <Box display='flex' flexDirection='column' gap={1}>
                            <HStack>
                                <Text fontWeight={"bold"}>{thread.user.full_name}</Text>
                                <Text textColor={"GrayText"}>@{thread.user.full_name}</Text>
                                <Text textColor={"GrayText"}>·</Text>
                                {/* format created at to duration with date-fns */}
                                <Text textColor={"GrayText"}>{formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}</Text>
                            </HStack>
                            <VStack alignItems='start'>
                                <Link to={`/${thread.id}`}>
                                    <Text>{thread.content}</Text>
                                </Link>
                                {thread?.image && (
                                    <Image src={thread.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                                )}
                            </VStack>
                            <HStack gap={4} mt={2}>
                                {thread.is_liked ?
                                    <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{thread.number_of_likes}</Button>
                                    :
                                    <Button variant={"ghost"} leftIcon={<Heart />} textColor={"GrayText"}>{thread.number_of_likes}</Button>}
                                <Button variant={"ghost"} leftIcon={<ChatSquareText />} textColor={"GrayText"}>{thread.replies?.length} Reply</Button>
                            </HStack>
                        </Box>
                    </HStack>
                    <Divider />
                </React.Fragment>
            ))}
        </Box>
    )
}