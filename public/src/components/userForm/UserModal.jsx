import React, { useState } from "react";
import {
  Button,
  Input,
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
import { placeholderApi } from "../../utils/baseUrl";
const UserModal = ({ isOpen, onClose, name, bio, id, setUser, header }) => {
  const initialData = { name, bio };
  console.log(initialData);
  const toast = useToast();
  const [data, setData] = useState(initialData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const editUser = async () => {
    try {
      const res = await placeholderApi.put(`users/${id}`, data, {
        headers: header,
      });
      console.log(res);
      if (res.data) {
        setUser(res.data);
        toast({
          title: "User Updated Successfully",
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
            <Input
              value={data.name}
              name="name"
              placeContent={"Enter your name"}
              onChange={handleChange}
            />
            <Textarea
              value={data.bio}
              name="bio"
              placeContent={"Enter your Bio"}
              onChange={handleChange}
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
            onClick={editUser}
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

export default UserModal;
