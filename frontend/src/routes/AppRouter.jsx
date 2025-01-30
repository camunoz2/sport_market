import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
