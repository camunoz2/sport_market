import Header from "../components/header";
import Footer from "../components/footer";
import { Outlet } from "react-router";

const BaseLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
