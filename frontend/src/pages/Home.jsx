import { useContext, useEffect } from "react";
import CategoryList from "../components/category-list";
import CategoryNav from "../components/category-nav";
import Footer from "../components/footer";
import Header from "../components/header";
import ProductCard from "../components/product-card";
import products from "../data/products";
import { CartContext } from "../context/CartContext";

function Home() {
  const categories = ["Tecnología", "Hogar", "Moda", "Deportes", "Juguetes"];
  const { addToCart, cart } = useContext(CartContext);

  useEffect(() => {
    console.log(cart);
    console.log(products);
  }, [cart]);

  return (
    <>
      <Header />
      <CategoryNav categories={categories} />
      {/* Imagen destacada responsiva */}
      <img
        src="/featured.png"
        alt="imagen destacada"
        className="w-full max-w-full h-auto"
      />

      {/* Categorías */}
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-2xl md:text-4xl py-4">Categorías</h2>
        <CategoryList />
      </div>

      {/* Productos */}
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-2xl md:text-4xl py-4">Productos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
