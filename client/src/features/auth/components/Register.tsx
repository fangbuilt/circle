import { Button, FormControl, Heading, Input, Text, Stack, Link as ChakraLink, StackDivider, Divider, Flex, Image, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import CircleLogo from "../../../../public/circle-logo.svg"

export default function RegisterForm() {
  const { handleChange, handleRegister } = useRegister()
  return (
    <Box w={400} mx={"auto"}>
      <Flex direction={"column"} gap={5} height={"100vh"} justify={"center"}>
        <Image src={CircleLogo} w={100} />
        <Heading size={"md"}>Create a new Circle account</Heading>
        <FormControl as={Stack} spacing={2} isRequired>
          <Input placeholder="Full Name" name="full_name" onChange={handleChange} focusBorderColor="circleGreen" />
          <Input placeholder="Username" name="username" onChange={handleChange} focusBorderColor="circleGreen" />
          <Input placeholder="Email" type="email" name="email" onChange={handleChange} focusBorderColor="circleGreen" />
          <Input placeholder="Password" type="password" name="password" onChange={handleChange} focusBorderColor="circleGreen" />
          <StackDivider />
          <Button borderRadius={"full"} bgColor={"circleGreen"} onClick={handleRegister}>Register</Button>
        </FormControl>
        <Divider />
        <Text textAlign={"center"}>Already have an account? {" "}
          <ChakraLink as={RouterLink} to={"/auth/login"} textColor={"circleGreen"}>
            Login
          </ChakraLink>
        </Text>
      </Flex>
    </Box>
  )
}