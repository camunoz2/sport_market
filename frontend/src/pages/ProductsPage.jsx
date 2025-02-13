import { useState, useContext } from "react";
import ProductCard from "../components/product-card";
import { useNavigate, useLocation } from "react-router";
import { CartContext } from "../context/CartContext";
import useProducts from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { error, isError, isPending, data } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }
  const filteredProducts =
    selectedCategory === "Todos los Productos"
      ? data
      : data?.filter((product) => product.category === selectedCategory);

  const productsPerPage = 10; // Define the number of products per page
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage); // Calculate total pages

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoToHome = () => {
    navigate("/"); // Redirige al Home
  };

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h2 className="font-bold text-2xl md:text-4xl py-4 text-center">
          {selectedCategory}
        </h2>

        {/* Grid de productos con espaciado adecuado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </div>

        {/* Paginación con espaciado */}
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Primera
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            Anterior
          </button>

          <span className="mx-2 text-lg font-bold">
            {currentPage} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            Siguiente
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Última
          </button>
        </div>

        {/* Botón de regresar al Home */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleGoToHome}
            className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
          >
            Regresar al Home
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
