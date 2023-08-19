import { Avatar, Button, Divider, HStack, Input, Textarea } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Image } from "react-bootstrap-icons";

export default function PostThread() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    if (!file) {
      return
    }
    event.target.value = ""
  }

  return (
    <React.Fragment>
      <HStack p={4} spacing={3}>
        <Avatar />
        <form encType="multipart/form-data"
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "1em"
          }}>
          <Textarea
            placeholder="What's on your mind?"
            _placeholder={{ fontSize: "xl" }}
            resize={"none"}
            variant={"unstyled"}
            focusBorderColor="gray.700"
            height={"100px"}
            pt={"2.25em"}
          >
          </Textarea>
          <Input type="file" display={"none"} onChange={handleChange} ref={inputRef} />
          <Button onClick={handleClick}><Image /></Button>
          <Button borderRadius={"full"} px={6} colorScheme="green">Post</Button>
        </form>
      </HStack>
      <Divider />
    </React.Fragment>
  )
}