import CategoryList from "./components/category-list";
import CategoryNav from "./components/category-nav";
import Footer from "./components/footer";
import Header from "./components/header";
import ProductCard from "./components/product-card";

function App() {
  return (
    <>
      <Header />
      <CategoryNav />
      <img src="/featured.png" alt="imagen destacada" className="w-full" />
      <div className="container mx-auto">
        <h2 className="font-bold text-4xl py-8">Categorias</h2>
      </div>
      <CategoryList />
      <div className="container mx-auto">
        <h2 className="font-bold text-4xl py-8">Producto</h2>
      </div>
      <div className="grid grid-cols-3 gap-2 container mx-auto">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
      <Footer />
    </>
  );
}

export default App;
