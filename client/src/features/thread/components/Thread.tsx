import {
  Avatar,
  Button,
  Divider,
  HStack,
  Image,
  Stack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react"
import { format } from "date-fns"
import { ChatSquareText, Heart, HeartFill } from "react-bootstrap-icons"
import ErrorMessage from "../../../components/Error"
import Loading from "../../../components/Loading"
import useGetThread from "../hooks/useGetThread"
import { useSelector } from "react-redux"
import { RootState } from "../../../stores/types/rootState"
import useLike from "../../like/hooks/useLike"

export default function ThreadCardDetail() {
  const { data, isLoading, isError } = useGetThread()
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
  const thread = data

  return (
    <Stack pt={4} spacing={4}>
      {thread && (
        <Stack align={"start"} spacing={4} mx={4}>
          <HStack gap={4}>
            <Avatar name={thread.user.full_name} src={thread.user.avatar} />
            <Stack align={"start"} spacing={0}>
              <Text fontWeight={"bold"}>{thread.user.full_name}</Text>
              <Text textColor={"GrayText"}>@{thread.user.username}</Text>
            </Stack>
          </HStack>

          <Stack spacing={1}>
            <Stack align={"start"} spacing={4}>
              <Text>{thread.content}</Text>
              {thread.image && (
                <Image
                  src={thread.image}
                  alt="User Attachment"
                  borderRadius='.5rem'
                  w='40rem' h='30rem'
                  objectFit='cover'
                />
              )}
            </Stack>

            <HStack mt={4}>
              <Text textColor={"GrayText"}>
                {format(new Date(thread.created_at), "hh:mm a")}
              </Text>
              <Text textColor={"GrayText"}>·</Text>
              <Text textColor={"GrayText"}>
                {format(new Date(thread.created_at), "MMM dd, yyyy")}
              </Text>
            </HStack>

            <HStack spacing={4} mt={2}>
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
              >
                {thread.replies?.length == 0
                  ? ""
                  : thread.replies?.length
                }
                {" "}
                {thread.replies && thread.replies.length > 1
                  ? "Replies"
                  : "Reply"
                }
              </Button>
              {auth && auth.email === thread.user.email && (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant={"ghost"}
                    textColor={"GrayText"}
                  >
                    More...
                  </MenuButton>
                  <MenuList bgColor={"circleDark"}>
                    <MenuItem
                      bgColor={"circleDark"}
                      textColor={"red.300"}
                      _hover={{ bgColor: "circleAccent" }}
                    >
                      Delete this thread
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </HStack>
          </Stack>
        </Stack>
      )}
      <Divider borderColor={"circleAccent"} />
    </Stack>
  )
}