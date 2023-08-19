import { Avatar, Button, Flex, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";

export default function ProfileCard() {
  return (
    <Flex direction={"column"} backgroundColor={"whiteAlpha.100"} borderRadius={"md"} p={4} gap={3}>
      <Heading size={"sm"}>My Profile</Heading>
      <Image
        src="https://img.freepik.com/free-vector/gradient-background-green-tones_23-2148374530.jpg"
        h={"4.5em"}
        w={"full"}
        objectFit={"cover"}
        borderRadius={"md"}
        position={"relative"}
      />
      <Avatar size={"lg"} position={"absolute"} top={"4em"} left={"2em"} />
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
        <Heading size={"md"}>Seo Soojin</Heading>
        <Text fontSize={"sm"} textColor={"GrayText"}>@_seosootang</Text>
        <Text isTruncated>Formerly the captivating dancer from (G)I-DLE</Text>
      </Stack>
      <HStack spacing={3}>
        <HStack spacing={1}>
          <Text fontWeight={"medium"}>6</Text>
          <Text textColor={"GrayText"}>Following</Text>
        </HStack>
        <HStack spacing={1}>
          <Text fontWeight={"medium"}>2.7m</Text>
          <Text textColor={"GrayText"}>Followers</Text>
        </HStack>
      </HStack>
    </Flex>
  )
}