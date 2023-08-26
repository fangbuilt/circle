import { Avatar, Box, Button, Divider, HStack, Image, Input, Textarea } from "@chakra-ui/react";
import React from "react";
import { Image as ImageIcon, X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";
import usePostReply from "../hooks/usePostReply";

export default function PostReply() {
  const current = useSelector((state: RootState) => state.auth)

  const {
    handleChange,
    handlePost,
    handleClick,
    inputRef,
    loading,
    preview,
    cancelPreview
  } = usePostReply()

  return (
    <React.Fragment>
      <HStack px={4} py={1} spacing={3}>
        <Avatar src={current?.avatar} name={current.full_name} />
        <form
          encType="multipart/form-data"
          onSubmit={handlePost}
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "1em"
          }}
        >
          <Textarea
            placeholder={`Post a reply as ${current.full_name.split(" ")[0]}`}
            _placeholder={{ fontSize: "large" }}
            resize={"none"}
            variant={"unstyled"}
            focusBorderColor="circleDark"
            pt={7}
            px={1}
            name="content"
            onChange={handleChange}
          />
          <Input
            type="file"
            accept="image/jpeg, image/png, image/gif"
            display={"none"}
            onChange={handleChange}
            ref={inputRef}
            name="image"
          />
          <Button onClick={handleClick}><ImageIcon /></Button>
          <Button
            borderRadius={"full"}
            px={6}
            bgColor={"circleGreen"}
            type="submit"
            isLoading={loading}
            loadingText="Posting..."
          >
            Reply
          </Button>
        </form>
      </HStack>
      {preview &&
        <Box position={"relative"} w={"30em"} mx={"auto"} mt={5} mb={10}>
          <Button
            onClick={cancelPreview}
            position={"absolute"}
            top={0}
            right={0}
            m={3}
            variant={"solid"}
            colorScheme="red"
            p={1}
            borderRadius={"full"}
            size={"xs"}
          >
            <X size={15} />
          </Button>
          <Image
            src={preview}
            w={"30em"}
            h={"30em"}
            objectFit={"cover"}
            borderRadius={"lg"}
          />
        </Box>
      }
      <Divider borderColor={"circleAccent"} />
    </React.Fragment>
  )
}