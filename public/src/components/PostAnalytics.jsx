import React, { useEffect, useState } from "react";
import { placeholderApi } from "../utils/baseUrl";
import { Grid, Heading, Stack } from "@chakra-ui/react";
import LoaderComponent from "./LoaderSpinnner";
import SinglePost from "./SinglePost";

const PostAnalytics = () => {
  const [allPosts, setAllPosts] = useState(0);
  const [topPosts, setTopPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(topPosts);
  const getData = async () => {
    setLoading(true);
    try {
      const getAllPosts = await placeholderApi.get("analytics/posts");
      const getTopPosts = await placeholderApi.get("analytics/posts/top-liked");
      if (getAllPosts.data && getTopPosts.data) {
        setAllPosts(getAllPosts.data);
        setTopPosts(getTopPosts.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <LoaderComponent visiblity={loading} />;
  }
  return (
    <Stack>
      <Heading
        color={"#808090"}
        textDecoration={"underline"}
        textAlign={"center"}
      >
        Total Posts : {allPosts.totalPosts}
      </Heading>
      <Stack mt={"1rem"}>
        <Heading size={"lg"} color="#808090" textAlign={"center"}>
          Top Likes Posts
        </Heading>
        <Stack>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2,1fr)",
              lg: "repeat(5,1fr)",
            }}
            gap={5}
          >
            {topPosts && topPosts.length > 0 ? (
              topPosts.map((post) => (
                <SinglePost
                  key={post._id}
                  content={post.content}
                  likes={post.likes}
                  user={post.user_id}
                  postId={post._id}
                  setPostData={setTopPosts}
                />
              ))
            ) : (
              <Heading textAlign={"center"} color="#808090" mt="2rem">
                {" "}
                No post found
              </Heading>
            )}
          </Grid>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default PostAnalytics;
