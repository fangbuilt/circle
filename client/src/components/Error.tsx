import { Flex, Text } from "@chakra-ui/react";

export default function ErrorMessage() {
    return (
        <Flex direction={"column"} align={"center"} gap={5} height={"100vh"} justify={"center"}>
            <Text>Error</Text>
        </Flex>
    )
}