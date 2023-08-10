import { Box, HStack, Image, Text, VStack, Button } from "@chakra-ui/react"
import { useState } from "react"
import DummyData from "../../../utils/thread/thread.json"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"

export default function Replies() {
    const [threadData] = useState(DummyData)
    const { id } = useParams()

    if (!id) {
        return (
            <div>
                Thread not found
            </div>
        )
    }

    const parseReplies = threadData.find(item => item.thread_id === parseInt(id))

    if (!parseReplies) {
        return (
            <div>
                This thread is no longer available
            </div>
        )
    }

    const { replies } = parseReplies

    return (
        <Box
            m={5}
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            gap={5}
        >
            {replies.map((reply, index) => (
                <HStack key={index} alignItems='top' gap={5} borderBottom='1px' pb={5}>
                    <Image src={reply.profile_picture} alt="User Profile Picture" borderRadius='full' boxSize='3rem' objectFit='cover' />
                    <Box display='flex' flexDirection='column' gap={1}>
                        <HStack>
                            <Text>{reply.name}</Text>
                            <Text>@{reply.username}</Text>
                            <Text>·</Text>
                            <Text>{reply.posted_since} ago</Text>
                        </HStack>
                        <VStack alignItems='start'>
                            <Text>{reply.thread_content}</Text>
                            <Image src={reply.thread_attachment} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                        </VStack>
                        <Box display='flex' gap={5} mt={4}>
                            {reply.is_liked ? <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{reply.like_count}</Button> : <Button variant={"ghost"} leftIcon={<Heart />}>{reply.like_count}</Button>}
                            <Button variant={"ghost"} leftIcon={<ChatSquareText />}>{reply.reply_count} Replies</Button>
                        </Box>
                    </Box>
                </HStack>
            ))}
        </Box>
    )
}