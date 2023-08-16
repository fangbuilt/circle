import { Button, FormControl, Heading, Input, Link as ChakraLink, Stack, Text, StackDivider, Divider, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { handleChange, handleLogin } = useLogin()
  return (
    <Flex direction={"column"} align={"center"} gap={5} height={"100vh"} justify={"center"}>
      <Heading>Login</Heading>
      <FormControl as={Stack} spacing={2} w={400} isRequired>
        <Input placeholder="Email" type="email" name="email" onChange={handleChange} />
        <Input placeholder="Password" type="password" name="password" onChange={handleChange} />
        <StackDivider />
        <Button borderRadius={"full"} colorScheme="green" onClick={handleLogin}>Login</Button>
      </FormControl>
      <Divider />
      <Text>No account yet? {" "}
        <ChakraLink as={RouterLink} to={"/auth/register"} textColor={"green.300"}>
          Create new account
        </ChakraLink>
      </Text>
    </Flex>
  )
}