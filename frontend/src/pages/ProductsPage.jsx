import { useState } from "react";
import ProductCard from "../components/product-card";
import { generateProducts } from "../utils/fakerjs";
import { useNavigate } from "react-router";

function ProductsPage() {
  const products = generateProducts(20) || []; // Asegura que products siempre sea un array
  const navigate = useNavigate();

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 3 productos por fila, 3 filas
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Filtrar productos válidos antes de hacer el slice
  const validProducts = products.filter((product) => product && product.image);

  const currentProducts = validProducts.slice(
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
    <div className="container mx-auto px-4 py-6">
      <h2 className="font-bold text-2xl md:text-4xl py-4 text-center">
        Todos los Productos
      </h2>

      {/* Grid de productos con espaciado adecuado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={() => {}} />
        ))}
      </div>

      {/* Paginación responsiva */}
      <div className="flex flex-wrap justify-center mt-8 gap-2 sm:gap-4">
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          Primera
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
        >
          Anterior
        </button>

        <span className="mx-2 text-sm sm:text-lg font-bold">
          {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 text-sm sm:text-base"
        >
          Siguiente
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
        >
          Última
        </button>
      </div>

      {/* Botón de regresar al Home */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleGoToHome}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
        >
          Regresar al Home
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;
