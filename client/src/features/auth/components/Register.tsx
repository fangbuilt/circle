import { Button, FormControl, Heading, Input, Text, Stack, Link as ChakraLink, StackDivider, Divider, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

export default function RegisterForm() {
 const { handleChange, handleRegister } = useRegister()
 return (
  <Flex direction={"column"} align={"center"} gap={5} height={"100vh"} justify={"center"}>
   <Heading>Create new account</Heading>
   <FormControl as={Stack} spacing={2} width={400} isRequired>
    <Input placeholder="Full Name" name="full_name" onChange={handleChange} />
    <Input placeholder="Username" name="username" onChange={handleChange} />
    <Input placeholder="Email" type="email" name="email" onChange={handleChange} />
    <Input placeholder="Password" type="password" name="password" onChange={handleChange} />
    <StackDivider />
    <Button borderRadius={"full"} colorScheme="green" onClick={handleRegister}>Register</Button>
   </FormControl>
   <Divider />
   <Text>Already have an account? {" "}
    <ChakraLink as={RouterLink} to={"/auth/login"} textColor={"green.300"}>
     Login
    </ChakraLink>
   </Text>
  </Flex>
 )
}