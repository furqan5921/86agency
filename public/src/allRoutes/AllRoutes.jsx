import { Route, Routes } from "react-router-dom";
import { UserForm } from "../pages/UserForm";
import { PostForm } from "../components/post/PostForm";
import PostList from "../pages/PostList";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/postForm" element={<PostForm />} />
      <Route path="/postList" element={<PostList />} />
    </Routes>
  );
};

export default AllRoutes;
