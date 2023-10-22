import { Image, Button, Text, HStack, Divider, Avatar, Stack, Flex, Heading } from "@chakra-ui/react"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import { Link, useNavigate } from "react-router-dom"
import { Thread } from "../../../interfaces/featureInterfaces";
import { formatDistanceToNow } from "date-fns"
import React from "react";
import ErrorMessage from "../../../components/Error";
import Loading from "../../../components/Loading";
import useGetUserThreads from "../hooks/useGetUserThreads";
import useLike from "../../like/hooks/useLike";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";

export default function UserThreadCard() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useGetUserThreads()
  const { handleLike, handleUnlike } = useLike()
  const auth = useSelector((state: RootState) => state.auth)

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
  // console.log(data)
  return (
    <Stack py={4} spacing={4}>
      {data ? (
        data.map((thread: Thread, index: number) => (
          <React.Fragment key={index}>
            <Flex align={"start"} gap={4} px={4}>
              <Avatar name={thread.user.full_name} src={thread.user.avatar} />
              <Stack spacing={1}>
                <HStack>
                  <Text fontWeight={"bold"}>{thread.user.full_name}</Text>
                  <Text textColor={"GrayText"}>@{thread.user.username}</Text>
                  <Text textColor={"GrayText"}>·</Text>
                  <Text textColor={"GrayText"}>
                    {formatDistanceToNow(new Date(thread.created_at), { addSuffix: true })}
                  </Text>
                </HStack>
                <Stack spacing={4}>
                  <Link to={`/thread/${thread.id}`}>
                    <Text>{thread.content}</Text>
                  </Link>
                  {thread.image && (
                    <Image
                      src={thread.image}
                      alt="User Attachment"
                      borderRadius='.5rem'
                      w='30em'
                      h='24em'
                      objectFit='cover'
                    />
                  )}
                </Stack>

                <HStack gap={4} mt={2}>
                  {thread.likes
                    && thread.likes.length >= 1
                    && thread.likes.some(like => like.user.id === auth.id)
                    ? (
                      <Button
                        colorScheme="red"
                        variant={"ghost"}
                        leftIcon={<HeartFill />}
                        textColor={"red.200"}
                        onClick={() => handleUnlike(thread.id, auth.id)}
                      >
                        {thread.likes.length}
                      </Button>
                    ) : (
                      <Button
                        variant={"ghost"}
                        leftIcon={<Heart />}
                        textColor={"GrayText"}
                        onClick={() => handleLike(thread.id, auth.id)}
                      >
                        {thread.likes?.length}
                      </Button>
                    )}

                  <Button
                    variant={"ghost"}
                    leftIcon={<ChatSquareText />}
                    textColor={"GrayText"}
                    onClick={() => navigate(`/thread/${thread.id}`)}
                  >
                    {
                      thread.replies?.length == 0
                        ? ""
                        : thread.replies?.length
                    }
                    {" "}
                    {
                      thread.replies && thread.replies.length > 1
                        ? "Replies"
                        : "Reply"
                    }
                  </Button>
                </HStack>
              </Stack>
            </Flex>
            <Divider />
          </React.Fragment>
        ))
      ) : (
        <Flex direction={"column"} justify={"center"} align={"center"} h={"xl"}>
          <Heading size={"md"}>Zonk</Heading>
          <Text textColor={"GrayText"}>Nothing to see here.... yet</Text>
        </Flex>
      )}
    </Stack>
  )
}