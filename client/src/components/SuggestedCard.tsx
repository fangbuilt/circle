import { Avatar, Button, Flex, HStack, Heading, Stack, Text } from "@chakra-ui/react";

export default function SuggestedCard() {
  return (
    <Flex direction={"column"} bgColor={"circleAccent"} borderRadius={"md"} p={4} gap={4}>
      <Heading size={"sm"}>Suggested for you</Heading>
      <Stack>
        <Flex justify={"space-between"} align={"center"}>
          <HStack>
            <Avatar name="(G)I-DLE" src="https://upload.wikimedia.org/wikipedia/en/d/dc/%28G%29I-dle_-_I_Feel_digital.png" size={"sm"} />
            <Stack spacing={0}>
              <Text fontSize={"sm"}>(G)I-DLE</Text>
              <Text fontSize={"xs"} textColor={"GrayText"}>@g_i_dle</Text>
            </Stack>
          </HStack>
          <Button size={"sm"} variant={"outline"} borderRadius={"full"} isDisabled>Following</Button>
        </Flex>

        {/* Omit down after fetch */}
        <Flex justify={"space-between"} align={"center"}>
          <HStack>
            <Avatar name="Spider Gwen" src="https://assetsio.reedpopcdn.com/Spider-Gwen-4.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp" size={"sm"} />
            <Stack spacing={0}>
              <Text fontSize={"sm"}>Spider Gwen</Text>
              <Text fontSize={"xs"} textColor={"GrayText"}>@not_gwen_tennyson</Text>
            </Stack>
          </HStack>
          <Button size={"sm"} variant={"outline"} borderRadius={"full"}>Follow</Button>
        </Flex>

        <Flex justify={"space-between"} align={"center"}>
          <HStack>
            <Avatar name="Xtraordinary Girls" src="https://pbs.twimg.com/profile_images/1610924024091267073/UpPO8LMM_400x400.jpg" size={"sm"} />
            <Stack spacing={0}>
              <Text fontSize={"sm"}>Xtraordinary Girls</Text>
              <Text fontSize={"xs"} textColor={"GrayText"}>@grlgvng</Text>
            </Stack>
          </HStack>
          <Button size={"sm"} variant={"outline"} borderRadius={"full"}>Follow</Button>
        </Flex>

        <Flex justify={"space-between"} align={"center"}>
          <HStack>
            <Avatar name="John Doe" src="" size={"sm"} />
            <Stack spacing={0}>
              <Text fontSize={"sm"}>John Doe</Text>
              <Text fontSize={"xs"} textColor={"GrayText"}>@johndoe</Text>
            </Stack>
          </HStack>
          <Button size={"sm"} variant={"outline"} borderRadius={"full"}>Follow</Button>
        </Flex>
        {/* Omit up after fetch */}

      </Stack>
    </Flex>
  )
}