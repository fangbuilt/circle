import { Box, Button, Flex, Image, Stack } from "@chakra-ui/react";
import { ArrowBarLeft, Circle, CircleFill, House, HouseFill, Person, PersonFill, Search } from "react-bootstrap-icons";
import CircleLogo from "../assets/circle-logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import PostThreadModal from "../features/thread/components/PostThreadModal";

export default function SideBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { handleLogout } = useLogout()
  return (
    <Flex direction={"column"} position={"relative"} gap={5} h={"100vh"}>
      <Flex justifyContent={"left"} px={8} pt={10}>
        <Image src={CircleLogo} width={100} />
      </Flex>
      <Stack px={5} mt={5}>
        <Button
          justifyContent={"left"}
          variant={location.pathname === "/" ? "solid" : "ghost"}
          leftIcon={location.pathname === "/" ? <HouseFill /> : <House />}
          onClick={() => navigate("/")}
        >
          Home
        </Button>
        <Button
          justifyContent={"left"}
          variant={location.pathname === "/search" ? "solid" : "ghost"}
          leftIcon={<Search />}
          onClick={() => navigate("/search")}
        >
          Search
        </Button>
        <Button
          justifyContent={"left"}
          variant={location.pathname === "/my-circle" ? "solid" : "ghost"}
          leftIcon={location.pathname === "/my-circle" ? <CircleFill /> : <Circle />}
          onClick={() => navigate("/my-circle")}
        >
          My Circle
        </Button>
        <Button
          justifyContent={"left"}
          variant={location.pathname === "/profile" ? "solid" : "ghost"}
          leftIcon={location.pathname === "/profile" ? <PersonFill /> :<Person />}
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
        <PostThreadModal />
      </Stack>
      <Box px={5} mb={10} position={"absolute"} bottom={0}>
        <Button
          justifyContent={"left"}
          variant={"ghost"}
          leftIcon={<ArrowBarLeft />}
          onClick={handleLogout}
          colorScheme="red"
          >
          Logout
        </Button>
      </Box>
    </Flex>
  )
}