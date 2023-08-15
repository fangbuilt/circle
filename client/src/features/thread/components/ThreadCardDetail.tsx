import { Avatar, Box, Button, Divider, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { API } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Thread } from "../types/Interfaces"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import React from "react";
import ErrorMessage from "../../../components/Error"
import Loading from "../../../components/Loading"

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
            <Loading />
        )
    }

    if (isError) {
        return (
            <ErrorMessage />
        )
    }

    const thread = data

    return (
        <React.Fragment>
            <Box
                m={4}
                display='flex'
                justifyContent='start'
                flexDirection='column'
                alignItems='start'
                gap={4}>
                <VStack alignItems='top' gap={4}>
                    <HStack gap={4}>
                        <Avatar name={thread.user.full_name} src={thread.user.avatar} />
                        <VStack alignItems='start' gap={0}>
                            <Text fontWeight={"bold"}>{thread.user.full_name}</Text>
                            <Text textColor={"GrayText"}>@{thread.user.username}</Text>
                        </VStack>
                    </HStack>
                    <Box display='flex' flexDirection='column' gap={1}>
                        <VStack alignItems='start'>
                            <Text>{thread.content}</Text>
                            {thread?.image && (
                                <Image src={thread.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                            )}
                        </VStack>
                        <HStack mt={5}>
                            <Text textColor={"GrayText"}>{format(new Date(thread.created_at), "hh:mm a")}</Text>
                            <Text textColor={"GrayText"}>·</Text>
                            <Text textColor={"GrayText"}>{format(new Date(thread.created_at), "MMM dd, yyyy")}</Text>
                        </HStack>
                        <HStack gap={4} mt={2}>
                            {thread.is_liked ?
                                <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{thread.number_of_likes}</Button>
                                :
                                <Button variant={"ghost"} leftIcon={<Heart />} textColor={"GrayText"}>{thread.number_of_likes}</Button>
                            }
                            <Button variant={"ghost"} leftIcon={<ChatSquareText />} textColor={"GrayText"}>
                                {thread.replies.length == 0 ? "" : thread.replies.length} {thread.replies.length > 1 ? "Replies" : "Reply"}
                            </Button>
                        </HStack>
                    </Box>
                </VStack>
            </Box>
            <Divider />
        </React.Fragment>
    )
}