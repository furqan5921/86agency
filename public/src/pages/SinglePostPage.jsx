import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { Box, Heading, Text, useToast } from "@chakra-ui/react";
import { placeholderApi } from "../utils/baseUrl";
import { useParams } from "react-router-dom";
import LoaderComponent from "../components/LoaderSpinnner";

const SinglePostPage = () => {
  const toast = useToast();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const getPost = async () => {
    setLoading(true);
    try {
      const res = await placeholderApi.get(`posts/${id}`, {
        headers: header,
      });
      console.log(res);
      if (res.data) {
        setPost(res.data);
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "An error occured while retrieving the post",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    getPost();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <LoaderComponent />;
  }
  return (
    <>
      <Navbar />
      {post && (
        <Box>
          <Heading
            color={"#808090"}
            textDecoration={"underline"}
            textAlign={"center"}
            mt={"1rem"}
          >
            Posted By :{post.user_id?.name}
          </Heading>
          <Text
            mx={"2rem"}
            textAlign={"center"}
            size={"sm"}
            mt={"1rem"}
            color={"#808090"}
          >
            Total Likes : {post.likes}
          </Text>
          <Text mx={"2rem"} mt={"1rem"} color={"#808090"}>
            Description : {post.content}
          </Text>
        </Box>
      )}
    </>
  );
};

export default SinglePostPage;
