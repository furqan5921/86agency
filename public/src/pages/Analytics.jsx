import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import UserAnalytics from "../components/UserAnalytics";
import PostAnalytics from "../components/PostAnalytics";


const Analytics = () => {
  const [mode, setMode] = useState("user");
 
  return (
    <div>
      <Navbar />
      <Stack spacing={"8"}>
        <Heading
          color={"#808090"}
          textDecoration={"underline"}
          textAlign={"center"}
        >
          Analytics
        </Heading>
        <Flex>
          <Button
            onClick={() => setMode("user")}
            border={"1px solid gray"}
            bg={mode === "user" ? "#FFFFFF" : "#1f64ff"}
            color={mode === "user" ? "#1f64ff" : "#FFFFFF"}
            flex={1}
          >
            User Analytics
          </Button>
          <Button
            border={"1px solid gray"}
            onClick={() => setMode("post")}
            bg={mode === "post" ? "#FFFFFF" : "#1f64ff"}
            color={mode === "post" ? "#1f64ff" : "#FFFFFF"}
            flex={1}
          >
            Post Analytics
          </Button>
        </Flex>
        {mode === "user" && <UserAnalytics />}
        {mode === "post" && <PostAnalytics />}
      </Stack>
    </div>
  );
};

export default Analytics;
