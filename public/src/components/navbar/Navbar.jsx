import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Icon from "../../assets/icon.png";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <Box
      position={"sticky"}
      top={"0px"}
      w={"100%"}
      h={"60px"}
      border={"1px solid red"}
      padding={"14px"}
      bg={"#c2dafb"}
    >
      <Flex bg={"#FFFFFF"} justify={"space-between"} border={"1px solid teal"}>
        <Box display={"flex"} placeItems={"center"}>
          <Image w={"40px"} height={"30px"} objectFit={"contain"} src={Icon} />
        </Box>
        <Flex placeContent={"center"} gap={8}>
          <NavLink to={"/postForm"}>
            <Button color={"#808090"} variant={"link"}>
              PostForm
            </Button>
          </NavLink>
          <NavLink to={"/userList"}>
            <Button color={"#808090"} variant={"link"}>
              UserList
            </Button>
          </NavLink>
          <NavLink to={"/userList"}>
            <Button color={"#808090"} variant={"link"}>
              PostList
            </Button>
          </NavLink>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
