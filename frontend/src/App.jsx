import CategoryList from "./components/category-list";
import CategoryNav from "./components/category-nav";
import Header from "./components/header";

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
    </>
  );
}

export default App;
