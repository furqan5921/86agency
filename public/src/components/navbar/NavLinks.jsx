import { Button } from "@chakra-ui/react";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const NavLinks = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <NavLink to={"/postForm"}>
        <Button color={"#808090"} variant={"link"}>
          PostForm
        </Button>
      </NavLink>
      <NavLink to={"/"}>
        <Button color={"#808090"} variant={"link"}>
          UserList
        </Button>
      </NavLink>
      <NavLink to={"/postList"}>
        <Button color={"#808090"} variant={"link"}>
          PostList
        </Button>
      </NavLink>
      <NavLink to={"/analytics"}>
        <Button color={"#808090"} variant={"link"}>
          Analytics
        </Button>
      </NavLink>
      <Button onClick={handleLogout} color={"#808090"} variant={"link"}>
        Logout
      </Button>
    </>
  );
};

export default NavLinks;
