import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Box, Grid, Heading, useToast } from "@chakra-ui/react";
import { placeholderApi } from "../../utils/baseUrl";
import SingleUser from "../SingleUser";

const UpdateForm = () => {
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();
  const [userList, setUserList] = useState([]);
  console.log(userList);
  const getAllUsers = async () => {
    try {
      const res = await placeholderApi.get("users", { headers: header });
      if (res.data) {
        setUserList(res.data);
      }
    } catch (error) {
      toast({
        title: "Error occured",
        description:
          "Error while retrieving users please try again after sometime",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Navbar />
      <Box mt="1rem">
        <Heading
          color={"#808090"}
          textDecoration={"underline"}
          textAlign={"center"}
        >
          User List
        </Heading>
        <Grid
          mt={"1rem"}
          templateColumns={{
            base: "1fr",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          gap={5}
        >
          {userList &&
            userList.map((el) => <SingleUser key={el._id} {...el} />)}
        </Grid>
      </Box>
    </>
  );
};

export default UpdateForm;
