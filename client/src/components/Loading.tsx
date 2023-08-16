import { Flex } from "@chakra-ui/react"
import { InfinitySpin } from "react-loader-spinner"

export default function Loading() {
    return (
        <Flex direction={"column"} align={"center"} gap={5} height={"100vh"} justify={"center"}>
            <InfinitySpin />
        </Flex>
    )
}