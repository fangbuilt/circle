import { Image, Button, Text, HStack, Divider, Avatar, Stack } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"
import { Thread } from "../../../interfaces/featureInterfaces";
import { formatDistanceToNow } from "date-fns"
import React from "react";
import ErrorMessage from "../../../components/Error";
import Loading from "../../../components/Loading";
import useGetThreads from "../hooks/useGetThreads";

export default function ThreadCard() {
  const { data, isLoading, isError } = useGetThreads()
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
    <Stack py={4} spacing={4}>
      {data && (
        data.map((thread: Thread, index: number) => (
          <React.Fragment key={index}>
            <HStack align={"start"} spacing={4} mx={4}>
              <Avatar name={thread.user.full_name} src={thread.user.avatar} />
              <Stack spacing={1}>
                <HStack>
                  <Text fontWeight={"bold"}>{thread.user.full_name}</Text>
                  <Text textColor={"GrayText"}>@{thread.user.username}</Text>
                  <Text textColor={"GrayText"}>·</Text>
                  <Text textColor={"GrayText"}>{formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}</Text>
                </HStack>
                <Stack spacing={4}>
                  <Link to={`/thread/${thread.id}`}>
                    <Text>{thread.content}</Text>
                  </Link>
                  {thread?.image && (
                    <Image src={thread.image} alt="User Attachment" borderRadius='.5rem' w='25rem' maxH='30rem' objectFit='cover' />
                  )}
                </Stack>
                <HStack gap={4} mt={2}>
                  {thread.is_liked ?
                    <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{thread.number_of_likes}</Button>
                    :
                    <Button variant={"ghost"} leftIcon={<Heart />} textColor={"GrayText"}>{thread.number_of_likes}</Button>}
                  <Button variant={"ghost"} leftIcon={<ChatSquareText />} textColor={"GrayText"}>
                    {thread.replies.length == 0 ? "" : thread.replies.length} {thread.replies.length > 1 ? "Replies" : "Reply"}
                  </Button>
                </HStack>
              </Stack>
            </HStack>
            <Divider />
          </React.Fragment>
        ))
      )}
    </Stack>
  )
}