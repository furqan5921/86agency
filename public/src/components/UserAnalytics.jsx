import React, { useEffect, useState } from "react";
import { placeholderApi } from "../utils/baseUrl";
import { Heading, Stack } from "@chakra-ui/react";
import LoaderComponent from "./LoaderSpinnner";
import SingleUserAnalytics from "./SingleUserAnalytics";

const UserAnalytics = () => {
  const [allUsers, setAllUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(activeUsers);
  const getData = async () => {
    setLoading(true);
    try {
      const getTotalUsers = await placeholderApi.get("analytics/users");
      const getActiveUsers = await placeholderApi.get(
        "analytics/users/top-active"
      );
      if (getTotalUsers.data && getActiveUsers.data) {
        setAllUsers(getTotalUsers.data);
        setActiveUsers(getActiveUsers.data);
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
        Total Users : {allUsers.totalUsers}
      </Heading>
      <Stack>
        {activeUsers &&
          activeUsers.map((activeUser) => (
            <SingleUserAnalytics key={activeUser._id} {...activeUser} />
          ))}
      </Stack>
    </Stack>
  );
};

export default UserAnalytics;
