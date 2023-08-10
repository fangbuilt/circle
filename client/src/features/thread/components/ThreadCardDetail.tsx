import { useState } from "react"
import DummyData from "../../../utils/thread/thread.json"
import { useParams } from "react-router-dom"
import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"

export default function ThreadCardDetail() {
    const [threadData] = useState(DummyData)
    const { id } = useParams()

    if (!id) {
        return (
            <div>
                Thread not found
            </div>
        )
    }

    const observeThread = threadData.find(item => item.thread_id === parseInt(id))

    if (!observeThread) {
        return (
            <div>
                This thread is no longer available
            </div>
        )
    }

    const {
        profile_picture,
        name,
        username,
        post_time,
        post_date,
        thread_content,
        thread_attachment,
        like_count,
        reply_count,
        is_liked,
    } = observeThread;

    return (
        <Box
            m={5}
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            gap={5}>
            <VStack key={id} alignItems='top' gap={5} pb={5}>
                <HStack>
                    <Image src={profile_picture} alt="User Profile Picture" borderRadius='full' boxSize='3rem' objectFit='cover' />
                    <VStack alignItems='start' gap={0}>
                        <Text>{name}</Text>
                        <Text>@{username}</Text>
                    </VStack>
                </HStack>
                <Box display='flex' flexDirection='column' gap={1}>
                    <VStack alignItems='start'>
                        <Text>{thread_content}</Text>
                        <Image src={thread_attachment} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                    </VStack>
                    <HStack mt={5}>
                        <Text>{post_time}</Text>
                        <Text>·</Text>
                        <Text>{post_date}</Text>
                    </HStack>
                    <Box display='flex' gap={5} mt={4}>
                        {is_liked ?
                            <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{like_count}</Button>
                            :
                            <Button variant={"ghost"} leftIcon={<Heart />}>{like_count}</Button>
                        }
                        <Button variant={"ghost"} leftIcon={<ChatSquareText />}>{reply_count} Replies</Button>
                    </Box>
                </Box>
            </VStack>
        </Box>
    )
}