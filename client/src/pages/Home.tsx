import ThreadCardDetail from "../features/thread/components/Thread";
import Replies from "../features/thread/components/Replies";
import ThreadCard from "../features/thread/components/Threads";
import PostThread from "../features/thread/components/PostThread";
import { Divider, Flex, Heading } from "@chakra-ui/react";
import { Layout } from "../layouts/Layout";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

export function Home() {
    return (
        <Layout>
            <Heading size={"md"} p={4}>Home</Heading>
            <Divider />
            <PostThread />
            <ThreadCard />
        </Layout>
    )
}

export function ObserveThread() {
    const navigate = useNavigate()
    return (
        <Layout>
            <Flex alignItems={"center"} p={4} gap={4}>
                <Heading size={"md"} onClick={() => navigate(-1)} cursor={"pointer"}>
                    <ArrowLeft />
                </Heading>
                <Heading size={"md"}>A Circle's thread</Heading>
            </Flex>
            <Divider />
            <ThreadCardDetail />
            <Replies />
        </Layout>
    )
}
