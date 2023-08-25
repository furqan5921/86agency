import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { placeholderApi } from "../../utils/baseUrl";

const PostModal = ({
  isOpen,
  onClose,
  initContent,
  setPostData,
  id,
  header,
}) => {
  const toast = useToast();
  const [content, setContent] = useState(initContent);
  const editPost = async () => {
    try {
      const res = await placeholderApi.put(
        `posts/${id}`,
        { content },
        { headers: header }
      );
      console.log(res);
      if (res.data) {
        setPostData((prevData) => {
          return prevData.map((el) => {
            if (el._id === id) {
              return {
                ...el,
                content,
              };
            }
            return el;
          });
        });
        toast({
          title: "Post Updated Successfully",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "There is some error occured while updating",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={"red"}
            color={"whitesmoke"}
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            onClick={editPost}
            bg={"blue.500"}
            color={"whitesmoke"}
            variant="ghost"
          >
            Confirm Changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
