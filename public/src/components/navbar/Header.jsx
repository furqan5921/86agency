import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Flex
      display={{ base: "none", md: "flex" }}
      mr={"10px"}
      justify={"center"}
      align={"center"}
      placeContent={"center"}
      gap={8}
    >
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
      <NavLink to={"/postList"}>
        <Button color={"#808090"} variant={"link"}>
          PostList
        </Button>
      </NavLink>
      <NavLink to={"/analytics"}>
        <Button color={"#808090"} variant={"link"}>
          Analytics
        </Button>
      </NavLink>
    </Flex>
  );
};

export default Header;
