import { Avatar, Button, Flex, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";

export default function ProfileCard() {
  const current = useSelector((state: RootState) => state.auth)
  return (
    <Flex direction={"column"} bgColor={"circleAccent"} borderRadius={"md"} p={4} gap={3}>
      <Heading size={"sm"}>My Profile</Heading>
      <Image
        src="https://img.freepik.com/free-vector/gradient-background-green-tones_23-2148374530.jpg"
        h={"4.5em"}
        w={"full"}
        objectFit={"cover"}
        borderRadius={"md"}
        position={"relative"}
      />
      <Avatar
        size={"xl"}
        position={"absolute"}
        top={"2.25em"}
        left={"1em"}
        src={current?.avatar}
        name={current.full_name}
        showBorder
        borderWidth={"5px"}
        borderColor={"circleAccent"}
      />
      <Button
        variant={"outline"}
        size={"sm"}
        borderRadius={"full"}
        w={"30%"}
        alignSelf={"end"}
      >
        Edit Profile
      </Button>
      <Stack spacing={0}>
        <Heading size={"md"}>{current.full_name}</Heading>
        <Text fontSize={"sm"} textColor={"GrayText"}>@{current.username}</Text>
        <Text isTruncated>{current.bio ? current.bio : "~no bio yet"}</Text>
      </Stack>
      <HStack spacing={3}>
        <HStack spacing={1}>
          <Text fontWeight={"semibold"}>2.7m</Text>
          <Text textColor={"GrayText"}>Followers</Text>
        </HStack>
        <HStack spacing={1}>
          <Text fontWeight={"semibold"}>7</Text>
          <Text textColor={"GrayText"}>Following</Text>
        </HStack>
      </HStack>
    </Flex>
  )
}