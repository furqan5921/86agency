import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const SingleUser = ({ name, bio, _id }) => {
  return (
    <Card>
      <CardBody color={"#808090"}>
        <Stack mt="6" spacing="3">
          <Heading size="md">Name : {name}</Heading>
          <Text>Bio : {bio}</Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter flexDirection={"column"} gap={5}>
        <Link to={`/user/${_id}`}>
          <Button
            //   onClick={handleDelete}
            bg={"#1f64ff"}
            color={"#FFFFFF"}
            variant={"outline"}
            w={"100%"}
          >
            View User
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SingleUser;
