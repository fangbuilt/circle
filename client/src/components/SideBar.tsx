import { Box, Button, Flex, Image, Stack } from "@chakra-ui/react";
import { ArrowBarLeft, Circle, House, Person, PlusCircleDotted, Search } from "react-bootstrap-icons";
import CircleLogo from "../../public/circle-logo.svg";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const navigate = useNavigate()
  return (
    <Flex direction={"column"} position={"relative"} gap={5} h={"100vh"}>
      <Flex justifyContent={"left"} px={8} pt={10}>
        <Image src={CircleLogo} width={100} />
      </Flex>
      <Stack px={5} mt={5}>
        <Button
          justifyContent={"left"}
          variant={"ghost"}
          leftIcon={<House />}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button justifyContent={"left"} variant={"ghost"} leftIcon={<Search />}>Search</Button>
        <Button justifyContent={"left"} variant={"ghost"} leftIcon={<Circle />}>My Circle</Button>
        <Button justifyContent={"left"} variant={"ghost"} leftIcon={<Person />}>Profile</Button>
        <Button mt={5} colorScheme="green" borderRadius={"full"} leftIcon={<PlusCircleDotted />}>New Thread</Button>
      </Stack>
      <Box px={5} mb={10} position={"absolute"} bottom={0}>
        <Button justifyContent={"left"} variant={"ghost"} leftIcon={<ArrowBarLeft />}>Logout</Button>
      </Box>
    </Flex>
  )
}