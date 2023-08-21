import { Flex, Box, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import SideBar from "../components/SideBar";
import SuggestedCard from "../components/SuggestedCard";
import FlexingIsland from "../components/FlexingIsland";
import ProfileCard from "../components/ProfileCard";
import "../assets/Layout.css"

interface LayoutProps {
  children: ReactNode
}

export function CommonLayout({ children }: LayoutProps) {
  return (
    <Flex justify={"center"} minHeight={"100vh"}>
      <Box
        position={"sticky"}
        top={0}
        height={"100vh"}
        width={"20%"}
        borderRight={"1px"}
        borderRightColor={"circleAccent"}
      >
        <SideBar />
      </Box>
      <Box width={"50%"}>
        {children}
      </Box>
      <Stack
        position={"sticky"}
        top={0} height={"100vh"}
        width={"30%"}
        borderLeft={"1px"}
        borderLeftColor={"circleAccent"}
        p={4}
        spacing={3}
        overflowY={"scroll"}
        className="hiddenScrollBar"
      >
        <ProfileCard />
        <SuggestedCard />
        <FlexingIsland />
      </Stack>
    </Flex>
  )
}

export function ProfileLayout({ children }: LayoutProps) {
  return (
    <Flex justify={"center"} minHeight={"100vh"}>
      <Box
        position={"sticky"}
        top={0}
        height={"100vh"}
        width={"20%"}
        borderRight={"1px"}
        borderRightColor={"circleAccent"}
      >
        <SideBar />
      </Box>
      <Box width={"50%"}>
        {children}
      </Box>
      <Stack
        position={"sticky"}
        top={0} height={"100vh"}
        width={"30%"}
        borderLeft={"1px"}
        borderLeftColor={"circleAccent"}
        p={4}
        spacing={3}
        overflowY={"scroll"}
        className="hiddenScrollBar"
      >
        <SuggestedCard />
        <FlexingIsland />
      </Stack>
    </Flex>
  )
}