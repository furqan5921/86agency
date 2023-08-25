import { useState } from "react";
import { CreateForm } from "../components/userForm/CreateForm";
import UpdateForm from "../components/userForm/UpdateForm";

export const UserForm = () => {
  const InitialUser = JSON.parse(localStorage.getItem("user")) || null;

  const [user, setUser] = useState(InitialUser);

  const updateUser = (passUser) => {
    setUser(passUser);
  };
  return user ? <UpdateForm /> : <CreateForm updateUser={updateUser} />;
};
