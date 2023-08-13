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
            const response = await API.get(`/thread/${id}/replies`)
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
            <Text>Total replies: {data.length}</Text>
            {data.map((item: Reply, index: number) => (
                <React.Fragment key={index}>
                <HStack alignItems='top' gap={4}>
                    <Avatar name={item.user.full_name} src={item?.user.avatar} />
                    <Box display='flex' flexDirection='column' gap={1}>
                        <HStack>
                            <Text>{item.user.full_name}</Text>
                            <Text textColor={"GrayText"}>@{item.user.username}</Text>
                            <Text textColor={"GrayText"}>·</Text>
                            {/* format created at to duration with date-fns*/}
                            <Text textColor={"GrayText"}>{formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}</Text>
                        </HStack>
                        <VStack alignItems='start'>
                            <Text>{item.content}</Text>
                            {item?.image && (
                                <Image src={item?.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                            )}
                        </VStack>
                        <HStack gap={4} mt={2}>
                            {item.is_liked ?
                                <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{item.number_of_likes}</Button>
                                :
                                <Button variant={"ghost"} leftIcon={<Heart />} textColor={"GrayText"}>{item.number_of_likes}</Button>}
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