import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import BaseLayout from "../layouts/base-layout.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<BaseLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
