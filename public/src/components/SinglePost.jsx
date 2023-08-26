import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { placeholderApi } from "../utils/baseUrl";
import PostModal from "./post/PostModal";
import { Link } from "react-router-dom";

const SinglePost = ({ postId, content, likes, user, setPostData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");
  const header = {
    Authorization: `Bearer ${token}`,
  };
  const toast = useToast();
  const handleDelete = async () => {
    try {
      const res = await placeholderApi.delete(`posts/${postId}`, {
        headers: header,
      });
      console.log(res);
      if (res.data) {
        setPostData((prevData) => {
          const updatedPostData = prevData.filter((el) => el._id !== postId);
          return updatedPostData;
        });
        toast({
          title: "Post deleted successfully ",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        title: "An error occured while deleting",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  const handleLike = async () => {
    try {
      const res = await placeholderApi.post(
        `posts/${postId}/like`,
        {},
        { headers: header }
      );
      console.log(res);
      if (res.data) {
        toast({
          title: "You have Liked the post",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        setPostData((prevData) => {
          return prevData.map((el) => {
            if (el._id === postId) {
              return {
                ...el,
                likes: el.likes + 1,
              };
            }
            return el;
          });
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  const handleDislike = async () => {
    if (likes < 1) {
      return toast({
        title: "You cannot unlike at this point",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
    try {
      const res = await placeholderApi.post(
        `posts/${postId}/unlike`,
        {},
        { headers: header }
      );
      if (res.data) {
        toast({
          title: "You have Unliked the post",
          status: "success",
          isClosable: true,
          duration: 3000,
        });
        setPostData((prevData) => {
          return prevData.map((el) => {
            if (el._id === postId) {
              return {
                ...el,
                likes: el.likes - 1,
              };
            }
            return el;
          });
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
  };
  return (
    <Card>
      <CardBody color={"#808090"}>
        <Stack mt="6" spacing="3">
          <Heading size="md">Posted By : {user.name}</Heading>
          <Text>Description : {content}</Text>
          <Text color="blue.600" fontSize="2xl">
            Likes : {likes}
          </Text>
          <Button
            color={"#808090"}
            bg={"#FFFFFF"}
            variant={"outline"}
            size={"sm"}
            onClick={handleLike}
          >
            Like Post
          </Button>
          <Button
            color={"#808090"}
            bg={"#FFFFFF"}
            variant={"outline"}
            size={"sm"}
            onClick={handleDislike}
          >
            Unlike Post
          </Button>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter flexDirection={"column"} gap={5}>
        <Button
          onClick={onOpen}
          bg={"#1f64ff"}
          color={"#FFFFFF"}
          variant={"outline"}
        >
          Edit Post
        </Button>
        <PostModal
          initContent={content}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          setPostData={setPostData}
          id={postId}
          header={header}
        />
        <Button
          onClick={handleDelete}
          bg={"#1f64ff"}
          color={"#FFFFFF"}
          variant={"outline"}
        >
          Delete Post
        </Button>
        <Link to={`/post/${postId}`}>
          <Button
            //   onClick={handleDelete}
            bg={"#1f64ff"}
            color={"#FFFFFF"}
            variant={"outline"}
            w={"100%"}
          >
            View Post
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SinglePost;
