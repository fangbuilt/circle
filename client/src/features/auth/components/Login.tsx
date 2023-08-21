import { Button, FormControl, Heading, Input, Link as ChakraLink, Stack, Text, StackDivider, Divider, Flex, Image, Box } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import CircleLogo from "../../../../public/circle-logo.svg"

export default function LoginForm() {
  const { handleChange, handleLogin } = useLogin()
  return (
    <Box w={400} mx={"auto"}>
      <Flex direction={"column"} gap={5} height={"100vh"} justify={"center"}>
        <Image src={CircleLogo} w={100} />
        <Heading size={"md"}>Login to Circle</Heading>
        <FormControl as={Stack} spacing={2} isRequired>
          <Input placeholder="Email" type="email" name="email" onChange={handleChange} focusBorderColor="circleGreen" />
          <Input placeholder="Password" type="password" name="password" onChange={handleChange} focusBorderColor="circleGreen" />
          <StackDivider />
          <Button borderRadius={"full"} bgColor={"circleGreen"} onClick={handleLogin}>Login</Button>
        </FormControl>
        <Divider />
        <Text textAlign={"center"}>No account yet? {" "}
          <ChakraLink as={RouterLink} to={"/auth/register"} textColor={"circleGreen"}>
            Create new account
          </ChakraLink>
          <br />
          <ChakraLink as={RouterLink} to={"/#"} textColor={"circleGreen"}>
            Forget your password?
          </ChakraLink>
        </Text>
      </Flex>
    </Box>
  )
}