import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { Box, Grid, Heading, useToast } from "@chakra-ui/react";
import { placeholderApi } from "../utils/baseUrl";
import SinglePost from "../components/SinglePost";

const PostList = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [postData, setPostData] = useState([]);
  
  const getPosts = async () => {
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };
      const res = await placeholderApi.get("posts", { headers: header });
      if (res.data) {
        setPostData(res.data);
      }
    } catch (error) {
      toast({
        title: "Error occured",
        description:
          "Error while retrieving posts please try again after sometime",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getPosts();
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
          Post List
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
          {postData &&
            postData.map((el) => (
              <SinglePost
                key={el._id}
                content={el.content}
                likes={el.likes}
                user={el.user_id}
                postId={el._id}
                setPostData={setPostData}
              />
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default PostList;
