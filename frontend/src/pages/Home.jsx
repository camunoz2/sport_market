import { useContext } from "react";
import { motion } from "framer-motion";
import CategoryList from "../components/category-list";
import CategoryNav from "../components/category-nav";
import Footer from "../components/footer";
import Header from "../components/header";
import ProductCard from "../components/product-card";
import { CartContext } from "../context/CartContext";
import useProducts from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";

function Home() {
  const { addToCart } = useContext(CartContext);
  const { isError, error, isLoading, data } = useProducts();

  if (isError) {
    return <div>Error {error?.message}</div>;
  }

  return (
    <>
      <Header />
      <CategoryNav />

      {/* Imagen destacada responsiva con animación */}
      <motion.img
        src="/featured.png"
        alt="imagen destacada"
        className="w-full max-w-full h-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Categorías */}
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <h2 className="font-bold text-2xl md:text-4xl py-4">Categorías</h2>
        <CategoryList />
      </motion.div>

      {/* Productos */}
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <h2 className="font-bold text-2xl md:text-4xl py-4">Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {!data && isLoading ? (
            <LoadingSpinner />
          ) : (
            data?.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} addToCart={addToCart} />
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      <Footer />
    </>
  );
}

export default Home;
