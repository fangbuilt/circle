import { Box, Divider, Flex, Heading, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import { CommonLayout } from "../layouts/Layout";
import { Search as SearchIcon } from "react-bootstrap-icons";

export function Search() {
  return (
    <CommonLayout>
      <Box position={"sticky"} top={0} backgroundColor={"circleDark"} zIndex={1}>
        <Heading size={"md"} p={4}>Search</Heading>
        <Divider borderColor={"circleAccent"} />
      </Box>
      <Box p={4}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon color="GrayText" />
          </InputLeftElement>
          <Input
            borderRadius={"full"}
            placeholder="Try typing a friend's name...."
            borderColor={"circleGreen"}
            focusBorderColor="circleGreen"
          />
        </InputGroup>
      </Box>
      <Flex direction={"column"} justify={"center"} align={"center"} h={"sm"}>
        <Heading size={"sm"}>Search all accounts accross Circle</Heading>
        <Text fontSize={"sm"} textColor={"GrayText"}>Your friends, colleagues, classmates, anyone might be here!</Text>
      </Flex>
    </CommonLayout>
  )
}