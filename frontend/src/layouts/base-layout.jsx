import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router";

const BaseLayout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto flex items-center justify-center">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default BaseLayout;
