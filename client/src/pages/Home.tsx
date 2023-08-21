import ThreadCardDetail from "../features/thread/components/Thread";
import Replies from "../features/reply/components/Replies";
import ThreadCard from "../features/thread/components/Threads";
import PostThread from "../features/thread/components/PostThread";
import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { CommonLayout } from "../layouts/Layout";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function Home() {
    return (
        <CommonLayout>
            <Box position={"sticky"} top={0} backgroundColor={"circleDark"} zIndex={1}>
                <Heading size={"md"} p={4}>Home</Heading>
                <Divider borderColor={"circleAccent"} />
            </Box>
            <PostThread />
            <ThreadCard />
        </CommonLayout>
    )
}

export function ObserveThread() {
    const navigate = useNavigate()
    return (
        <CommonLayout>
            <Box position={"sticky"} top={0} backgroundColor={"circleDark"} zIndex={1}>
                <Flex alignItems={"center"} p={4} gap={4}>
                    <Heading size={"md"} onClick={() => navigate(-1)} cursor={"pointer"}>
                        <ArrowLeft />
                    </Heading>
                    <Heading size={"md"}>A Circle's thread</Heading>
                </Flex>
                <Divider borderColor={"circleAccent"} />
            </Box>
            <ThreadCardDetail />
            <Replies />
        </CommonLayout>
    )
}
