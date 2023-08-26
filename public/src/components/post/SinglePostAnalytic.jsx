import { Button, Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const SinglePostAnalytic = ({ content, likes, postId }) => {
  return (
    <Card mt={"1rem"}>
      <CardBody>
        <Text>Description : {content.substring(0, 20)}...</Text>
        <Text>Likes : {likes}</Text>
        <Link to={`/post/${postId}`}>
          <Button w={"100%"} color={"#FFFFFF"} bg={"blue.500"}>
            View Post
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default SinglePostAnalytic;
