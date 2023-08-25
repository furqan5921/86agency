import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Logo from "../../assets/logo.png";

import authimage from "../../assets/Authimage.png";
import layer from "../../assets/Layer.png";
import { useState } from "react";
import { placeholderApi } from "../../utils/baseUrl";

import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

export const PostForm = () => {
    const navigate= useNavigate()
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };
      const res = await placeholderApi.post(
        "posts",
        { content },
        { headers: header }
      );
      console.log(res);
      if (res.data) {
        setLoading(false);
        setContent("");
        toast({
          title: "Post created.",
          description: "We've created your Post for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/postList")
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: "Unable to create post.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />

      <Container
        justifyContent={"center"}
        alignItems={"center"}
        maxW="100%"
        display={"flex"}
        height={"100vh"}
        backgroundColor={"#c2dafb"}
      >
        <Flex
          w={{ base: "100%", lg: "70%" }}
          bgColor={"#FFFFFF"}
          borderRadius={"0px 35px 0px 35px"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
        >
          <Stack // this is first child
            w={{ base: "90%", md: "48%" }}
            align={"center"}
            justifyContent={"space-around"}
            spacing={"15px"}
            my={"20px"}
          >
            <Image
              w={"160px"}
              h={"48px"}
              objectFit={"contain"}
              src={Logo}
              align={"Logo"}
            />
            <Text
              fontWeight={800}
              fontSize={"32px"}
              color={"#000000"}
              lineHeight={"48px"}
            >
              Hello!
            </Text>
            <Flex w={"90%"} justify={"space-between"} mx="10px">
              <Box w={"30%"} borderBottom={"1px solid #AAB2C8"}></Box>
              <Box
                display={"flex"}
                alignItems={"flex-end"}
                justifyContent={"center"}
                w={"40%"}
                fontSize={{ base: "10px", md: "11px", lg: "11px", xl: "14px" }}
                fontWeight={800}
                lineHeight={"21px"}
                color={"#848494"}
              >
                Create Your Post here!
              </Box>
              <Box w={"30%"} borderBottom={"1px solid #AAB2C8"}></Box>
            </Flex>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Stack align={"center"} justify={"center"} w={"100%"} spacing={5}>
                <Textarea
                  value={content}
                  size={"lg"}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your content Max 300 characters..."
                  borderRadius={"5px"}
                  isRequired
                  _placeholder={{
                    fontSize: "14px",
                    color: "#808090",
                    fontWeight: 700,
                    lineHeight: "21px",
                  }}
                  w={"90%"}
                  type="text"
                  name="bio"
                />
                <Button
                  fontWeight={700}
                  borderRadius={"5px"}
                  w={"90%"}
                  h={"45px"}
                  bg={"#1F64FF"}
                  color={"#FFFFFF"}
                  type="submit"
                  isLoading={loading}
                >
                  Post
                </Button>
              </Stack>
            </form>
          </Stack>
          <Flex // this is divider
            display={{ base: "none", md: "flex" }}
            height={"100%"}
            justify={"center"}
            align={"center"}
          >
            <Box height={"600px"} border={"1px solid #AAB2C8"}></Box>
          </Flex>
          <Box //this second child
            display={{ base: "none", md: "flex" }}
            flexDirection={"column"}
            w={{ base: "90%", md: "48%" }}
            height={{ base: "700px", lg: "750px" }}
            justifyContent={"end"}
          >
            <Image
              position={"relative"}
              top={"5px"}
              w={"100%"}
              objectFit={"contain"}
              src={authimage}
              zIndex={0}
              borderRadius={"0px 35px 35px 0px"}
            />
            <Image zIndex={99} w={"100%"} objectFit={"contain"} src={layer} />
          </Box>
        </Flex>
      </Container>
    </>
  );
};
