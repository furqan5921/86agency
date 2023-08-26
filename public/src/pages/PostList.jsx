import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { Box, Grid, Heading, useToast } from "@chakra-ui/react";
import { placeholderApi } from "../utils/baseUrl";
import SinglePost from "../components/SinglePost";
import LoaderComponent from "../components/LoaderSpinnner";

const PostList = () => {
  const token = localStorage.getItem("token");
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    setLoading(true);
    try {
      const header = {
        Authorization: `Bearer ${token}`,
      };
      const res = await placeholderApi.get("posts", { headers: header });
      if (res.data) {
        setPostData(res.data);
        setLoading(false);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <LoaderComponent visiblity={loading} />;
  }
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
