import { Box, Image, Button, Text, HStack, VStack } from "@chakra-ui/react"
import { useState } from "react"
import DummyData from "../../../utils/thread/thread.json"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

export default function ThreadCard() {
    const [threadData] = useState(DummyData)

    return (
        <Box
            m={5}
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            gap={5}
        >
            {threadData.map((item, index) => (
                <HStack key={index} alignItems='top' gap={5} borderBottom='1px' pb={5}>
                    <Image src={item.profile_picture} alt="User Profile Picture" borderRadius='full' boxSize='3rem' objectFit='cover' />
                    <Box display='flex' flexDirection='column' gap={1}>
                        <HStack>
                            <Text>{item.name}</Text>
                            <Text>@{item.username}</Text>
                            <Text>·</Text>
                            <Text>{item.posted_since} ago</Text>
                        </HStack>
                        <VStack alignItems='start'>
                            <Link to={`/${item.thread_id}`}>
                                <Text>{item.thread_content}</Text>
                            </Link>
                            <Image src={item?.thread_attachment} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                        </VStack>
                        <Box display='flex' gap={5} mt={4}>
                            {item.is_liked ? <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{item.like_count}</Button> : <Button variant={"ghost"} leftIcon={<Heart />}>{item.like_count}</Button>}
                            <Button variant={"ghost"} leftIcon={<ChatSquareText />}>{item.reply_count} Replies</Button>
                        </Box>
                    </Box>
                </HStack>
            ))}
        </Box>
    )
}