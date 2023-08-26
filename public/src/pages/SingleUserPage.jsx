import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { placeholderApi } from "../utils/baseUrl";
import UserModal from "../components/userForm/UserModal";

const SingleUserPage = () => {
  const toast = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const res = await placeholderApi(`users/${id}`, { headers: header });
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      toast({
        title: "An error occured while retrieving the user",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  const handleDelete = async () => {
    try {
      const res = await placeholderApi.delete(`users/${user._id}`, {
        headers: header,
      });
      console.log(res);
      if (res.data) {
        toast({
          title: "User deleted successfully ",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "An error occured while deleting",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      {user && (
        <Box>
          <Heading
            color={"#808090"}
            textDecoration={"underline"}
            textAlign={"center"}
          >
            User details
          </Heading>
          <Stack spacing={"9"}>
            <Heading color={"#808090"} textAlign={"center"} mt={"5rem"}>
              Name of the User - {user.name}
            </Heading>
            <Text fontSize={"2xl"} color={"#808090"} textAlign={"center"}>
              Email : {user.email}
            </Text>
            <Text fontSize={"3xl"} textAlign={"center"} color={"#808090"}>
              Bio : {user.bio}
            </Text>
            <Stack p={"1rem"} w={"50%"} margin={"auto"}>
              <Button onClick={onOpen} bg={"#1f64ff"} color={"#FFFFFF"}>
                Edit User
              </Button>
              <UserModal
                name={user.name}
                bio={user.bio}
                isOpen={isOpen}
                onClose={onClose}
                setUser={setUser}
                id={user._id}
                header={header}
              />
              <Button onClick={handleDelete} bg={"#1f64ff"} color={"#FFFFFF"}>
                Delete User
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default SingleUserPage;
