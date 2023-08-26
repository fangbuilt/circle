import { Avatar, Box, Button, Divider, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Textarea, useDisclosure, Image } from "@chakra-ui/react"
import { Image as ImageIcon, PlusCircleDotted, X } from "react-bootstrap-icons"
import { useSelector } from "react-redux"
import { RootState } from "../../../stores/types/rootState"
import usePostThread from "../hooks/usePostThread"
import React from "react"

export default function PostThreadModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const current = useSelector((state: RootState) => state.auth)

  const {
    handleChange,
    handlePost,
    handleClick,
    inputRef,
    loading,
    preview,
    cancelPreview
  } = usePostThread()

  return (
    <React.Fragment>
      <Button
        onClick={onOpen}
        bgColor={"circleGreen"}
        borderRadius={"full"}
        leftIcon={<PlusCircleDotted />}
        mt={5}
      >
        New Thread
      </Button>

      <Input
        display={"none"}
        name="image"
        onChange={handleChange}
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/png, image/gif"
        form="PostThreadForm"
      />

      <form
        id="PostThreadForm"
        encType="multipart/form-data"
        onSubmit={handlePost}
        style={{ display: "none" }}
      />

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"xl"}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent bgColor={"circleDark"} borderRadius={"lg"}>
          <ModalCloseButton />
          <ModalBody
            py={5}
            display={"flex"}
            gap={4}
            alignItems={"center"}
          >
            <Avatar name={current.full_name} src={current.avatar} />
            <Textarea
              placeholder={`What's going on, ${current.full_name.split(" ")[0]}?`}
              w={"80%"}
              _placeholder={{ fontSize: "xl" }}
              resize={"none"}
              variant={"unstyled"}
              focusBorderColor="circleDark"
              pt={7}
              px={1}
              name="content"
              onChange={handleChange}
              form="PostThreadForm"
            />
          </ModalBody>
          <Divider w={"95%"} mx={"auto"} />
          <ModalFooter justifyContent={"space-between"}>
            <Button onClick={handleClick}><ImageIcon /></Button>
            <Button
              bgColor={"circleGreen"}
              borderRadius={"full"}
              px={6}
              form="PostThreadForm"
              type="submit"
              isLoading={loading}
              loadingText="Posting..."
            >
              Post
            </Button>
          </ModalFooter>
          {preview &&
            <Box position={"relative"} w={"20em"} mx={"auto"} mb={10}>
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
                <X />
              </Button>
              <Image
                src={preview}
                w={"20em"}
                h={"20em"}
                objectFit={"cover"}
                borderRadius={"lg"}
              />
            </Box>
          }
        </ModalContent>
      </Modal>
    </React.Fragment>
  )
}