import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { CircleFill, Github, Linkedin } from "react-bootstrap-icons";
import DumbWaysLogo from "../assets/dumbways-logo.svg"
import { Link } from "react-router-dom";

export default function FlexingIsland() {
  return (
    <Box bgColor={"circleAccent"} borderRadius={"md"} p={4}>
      <HStack>
        <HStack spacing={1}>
          <Text fontSize={"sm"}>Developed by</Text>
          <Text fontWeight={"medium"} fontSize={"sm"}>Bintang Naufal</Text>
        </HStack>
        <HStack>
          <CircleFill size={".25em"} />
          <Link to={"https://github.com/1bintangnaufal"} target="_blank">
            <Github />
          </Link>
          <Link to={"https://www.linkedin.com/in/bintangnaufal/"} target="_blank">
            <Linkedin />
          </Link>
        </HStack>
      </HStack>
      <HStack>
        <Text fontSize={"xs"}>Powered by</Text>
        <Image src={DumbWaysLogo} w={5} />
        <Text fontSize={"xs"}>DumbWays Indonesia</Text>
      </HStack>
    </Box>
  )
}