import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import BaseLayout from "../layouts/base-layout.jsx";
import CreatePost from "../pages/CreatePost.jsx";
import ProductsPage from "../pages/ProductsPage";
import { NotFound } from "../components/NoFound.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<BaseLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/publicar" element={<CreatePost />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
