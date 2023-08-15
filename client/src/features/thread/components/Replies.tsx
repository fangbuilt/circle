import { Box, HStack, Image, Text, VStack, Button, Divider, Avatar } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { API } from "../../../lib/api"
import { useQuery } from "@tanstack/react-query"
import { Reply } from "../types/Interfaces"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import React from "react";
import Loading from "../../../components/Loading"
import ErrorMessage from "../../../components/Error"

export default function Replies() {
    const { id } = useParams()

    const fetch = async () => {
        try {
            const response = await API.get(`/replies?thread_id=${id}`)
            return response.data
        } catch (error) {
            throw new Error("Error while getting reply data")
        }
    }

    const { data, isLoading, isError } = useQuery<Reply[]>(["replies"], fetch)

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
            {data.map((reply: Reply, index: number) => (
                <React.Fragment key={index}>
                <HStack alignItems='top' gap={4}>
                    <Avatar name={reply.user.full_name} src={reply.user.avatar} />
                    <Box display='flex' flexDirection='column' gap={1}>
                        <HStack>
                            <Text>{reply.user.full_name}</Text>
                            <Text textColor={"GrayText"}>@{reply.user.username}</Text>
                            <Text textColor={"GrayText"}>·</Text>
                            {/* format created at to duration with date-fns*/}
                            <Text textColor={"GrayText"}>{formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}</Text>
                        </HStack>
                        <VStack alignItems='start'>
                            <Text>{reply.content}</Text>
                            {reply?.image && (
                                <Image src={reply?.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                            )}
                        </VStack>
                        <HStack gap={4} mt={2}>
                            {reply.is_liked ?
                                <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{reply.number_of_likes}</Button>
                                :
                                <Button variant={"ghost"} leftIcon={<Heart />} textColor={"GrayText"}>{reply.number_of_likes}</Button>}
                            <Button variant={"ghost"} leftIcon={<ChatSquareText /> } textColor={"GrayText"}>Reply</Button>
                        </HStack>
                    </Box>
                </HStack>
                <Divider />
                </React.Fragment>
            ))}
        </Box>
    )
}