import { Route, Routes } from "react-router-dom";
import { UserForm } from "../pages/UserForm";
import { PostForm } from "../components/post/PostForm";
import PostList from "../pages/PostList";
import Analytics from "../pages/Analytics";
import SingleUserPage from "../pages/SingleUserPage";
import SinglePostPage from "../pages/SinglePostPage";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/user/:id" element={<SingleUserPage />} />
      <Route path="/post/:id" element={<SinglePostPage />} />
      <Route path="/postForm" element={<PostForm />} />
      <Route path="/postList" element={<PostList />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
};

export default AllRoutes;
