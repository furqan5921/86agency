import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import icon from "../../assets/icon.png";
import { AiOutlineUnorderedList } from "react-icons/ai";

import NavLinks from "./NavLinks";
const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box
      display={{ base: "flex", md: "none" }}
      justifyContent={"center"}
      alignContent={"center"}
      h={"full"}
      mr={"10px"}
    >
      <Flex justify={"center"} align={"center"}>
        <Icon
          fontSize={20}
          as={AiOutlineUnorderedList}
          colorScheme="teal"
          onClick={onOpen}
        >
          Open
        </Icon>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Image
              ml={"10px"}
              w={"40px"}
              height={"30px"}
              objectFit={"contain"}
              src={icon}
            />
          </DrawerHeader>

          <DrawerBody>
            <Stack align={"center"} spacing={"8"}>
              <NavLinks />
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
