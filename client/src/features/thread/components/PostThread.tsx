import { Avatar, Button, Divider, HStack, Input, Textarea } from "@chakra-ui/react";
import React, { useRef } from "react";
import { Image } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../stores/types/rootState";

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

  const current = useSelector((state: RootState) => state.auth)

  return (
    <React.Fragment>
      <HStack p={4} spacing={3}>
        <Avatar src={current?.avatar} name={current.full_name} />
        <form encType="multipart/form-data"
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            gap: "1em"
          }}>
          <Textarea
            placeholder="What's on your mind?"
            _placeholder={{ fontSize: "large" }}
            resize={"none"}
            variant={"unstyled"}
            focusBorderColor="circleDark"
            height={"100px"}
            pt={"2.25em"}
          >
          </Textarea>
          <Input type="file" display={"none"} onChange={handleChange} ref={inputRef} />
          <Button onClick={handleClick}><Image /></Button>
          <Button borderRadius={"full"} px={6} bgColor={"circleGreen"}>Post</Button>
        </form>
      </HStack>
      <Divider borderColor={"circleAccent"} />
    </React.Fragment>
  )
}