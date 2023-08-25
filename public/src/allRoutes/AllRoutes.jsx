
import { Route, Routes } from "react-router-dom";
import { UserForm } from "../pages/UserForm";



const AllRoutes = () => {
 

  return (
    <Routes>
      <Route path="/" element={<UserForm  />} />
    </Routes>
  );
};

export default AllRoutes;
