import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

import SinglePostAnalytic from "./post/SinglePostAnalytic";
import { Link } from "react-router-dom";

const SingleUserAnalytics = ({ name, bio, posts, postCount, _id }) => {
  return (
    <Flex mx={"1rem"} gap={2} color={"#808090"} border={"1px solid gray"}>
      <Stack flex={1} p={"1rem"}>
        <Heading size={"md"}>Total Post Count : {postCount}</Heading>
        <Text fontSize={"md"}>Name : {name}</Text>
        <Text fontSize={"md"}>Bio : {bio.substring(0, 20)}...</Text>
        <Link to={`/user/${_id}`}>
          <Button color={"#FFFFFF"} bg={"blue.500"}>
            View user
          </Button>
        </Link>
      </Stack>
      <Stack border={"1px solid red"} flex={3}>
        <Flex justify={"space-around"} gap={5} flexWrap={"wrap"}>
          {posts.length > 0 ? (
            posts.map((el) => (
              <SinglePostAnalytic
                key={el._id}
                content={el.content}
                likes={el.likes}
                user={el.user_id}
                postId={el._id}
              />
            ))
          ) : (
            <Heading mt="1rem" textAlign={"center"} size={"md"}>
              No posts found
            </Heading>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default SingleUserAnalytics;
