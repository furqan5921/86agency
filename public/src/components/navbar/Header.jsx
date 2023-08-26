import {  Flex } from "@chakra-ui/react";
import React from "react";

import NavLinks from "./NavLinks";

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
      <NavLinks />
    </Flex>
  );
};

export default Header;
