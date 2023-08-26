import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Input,
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
const initialData = {
  name: "",
  email: "",
  bio: "",
};
export const CreateForm = ({ updateUser }) => {
  const toast = useToast();
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await placeholderApi.post("users", data);
      console.log(res);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        updateUser(res.data.user);
        setLoading(false);
        setData(initialData);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: "Unable to create user account.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  return (
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
              Register Your Account
            </Box>
            <Box w={"30%"} borderBottom={"1px solid #AAB2C8"}></Box>
          </Flex>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Stack align={"center"} justify={"center"} w={"100%"} spacing={5}>
              <Input
                borderRadius={"5px"}
                _placeholder={{
                  fontSize: "14px",
                  color: "#808090",
                  fontWeight: 700,
                  lineHeight: "21px",
                }}
                isRequired
                w={"90%"}
                h={"45px"}
                type="text"
                name="name"
                onChange={handleChange}
                value={data.name}
                placeholder="Enter your Name Max 50 characters..."
              />

              <Input
                borderRadius={"5px"}
                isRequired
                _placeholder={{
                  fontSize: "14px",
                  color: "#808090",
                  fontWeight: 700,
                  lineHeight: "21px",
                }}
                w={"90%"}
                h={"45px"}
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                placeholder="Email-Id"
              />
              <Textarea
                value={data.bio}
                onChange={handleChange}
                placeholder="Enter your bio Max 200 characters..."
                borderRadius={"5px"}
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
                Register
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
  );
};
