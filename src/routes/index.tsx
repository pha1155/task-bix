import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/routes/ProtectedRoute";
import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import BoardCreate from "@/pages/BoardCreate";
import BoardDetail from "@/pages/BoardDetail";
import BoardEdit from "@/pages/BoardEdit";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* 로그인이 필요한 페이지들 */}
        <Route element={<ProtectedRoute />}>
          {/* Layout 적용  */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/boards" element={<BoardCreate />} />
            <Route path="/boards/:id" element={<BoardDetail />} />
            <Route path="/boards/:id/edit" element={<BoardEdit />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
