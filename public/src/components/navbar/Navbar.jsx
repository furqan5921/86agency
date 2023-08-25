import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Icon from "../../assets/icon.png";

import Header from "./Header";
import Sidebar from "./Sidebar";
const Navbar = () => {
  return (
    <Box
      position={"sticky"}
      top={"0px"}
      w={"100%"}
      h={"80px"}
      padding={"14px"}
      bg={"#c2dafb"}
    >
      <Flex
        bg={"#FFFFFF"}
        h={"40px"}
        justify={"space-between"}
        borderRadius={"10px"}
      >
        <Box display={"flex"} placeItems={"center"}>
          <Image
            ml={"10px"}
            w={"40px"}
            height={"30px"}
            objectFit={"contain"}
            src={Icon}
          />
        </Box>
        <Header />
        <Sidebar />
      </Flex>
    </Box>
  );
};

export default Navbar;
