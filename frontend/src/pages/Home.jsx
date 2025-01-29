import CategoryList from "../components/category-list";
import CategoryNav from "../components/category-nav";
import Footer from "../components/footer";
import Header from "../components/header";
import ProductCard from "../components/product-card";

function App() {
  return (
    <>
      <Header />
      <CategoryNav />
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
        
        {/* Grid Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
