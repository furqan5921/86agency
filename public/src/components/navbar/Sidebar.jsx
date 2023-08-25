import {
  Box,
  Button,
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
import { NavLink } from "react-router-dom";
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
              <NavLink to={"/postForm"}>
                <Button onClick={onClose} color={"#808090"} variant={"link"}>
                  PostForm
                </Button>
              </NavLink>
              <NavLink to={"/userList"}>
                <Button onClick={onClose} color={"#808090"} variant={"link"}>
                  UserList
                </Button>
              </NavLink>
              <NavLink to={"/postList"}>
                <Button onClick={onClose} color={"#808090"} variant={"link"}>
                  PostList
                </Button>
              </NavLink>
              <NavLink to={"/analytics"}>
                <Button onClick={onClose} color={"#808090"} variant={"link"}>
                  Analytics
                </Button>
              </NavLink>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
