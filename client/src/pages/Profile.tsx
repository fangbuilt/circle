import { Avatar, Box, Button, Divider, Flex, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { ProfileLayout } from "../layouts/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../stores/types/rootState";

export function Profile() {
  const current = useSelector((state: RootState) => state.auth)
  return (
    <ProfileLayout>
      <Box position={"sticky"} top={0} backgroundColor={"circleDark"} zIndex={1}>
        <Heading size={"md"} p={4}>{current.full_name}</Heading>
        <Divider borderColor={"circleAccent"} />
      </Box>
      <Flex direction={"column"} p={4} gap={3}>
        <Image
          src="https://img.freepik.com/free-vector/gradient-background-green-tones_23-2148374530.jpg"
          h={"9em"}
          w={"full"}
          objectFit={"cover"}
          borderRadius={"lg"}
          position={"relative"}
        />
        <Avatar
          size={"xl"}
          position={"absolute"}
          top={"4.5em"}
          left={"7.5em"}
          src={current?.avatar}
          name={current.full_name}
          showBorder
          borderWidth={"5px"}
          borderColor={"circleDark"}
        />
        <Button
          variant={"outline"}
          borderRadius={"full"}
          w={"30%"}
          alignSelf={"end"}
        >Edit Profile
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
      <Divider />
      <Flex direction={"column"} justify={"center"} align={"center"} h={"xl"}>
        <Heading size={"md"}>Zonk</Heading>
        <Text textColor={"GrayText"}>Nothing to see here.... yet</Text>
      </Flex>
    </ProfileLayout>
  )
}