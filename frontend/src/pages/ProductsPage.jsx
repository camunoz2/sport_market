import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import ProductCard from "../components/product-card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import useProductsFromCategories from "../hooks/useProductsFromCategories";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products, categoryName, isLoading, isError, error } =
    useProductsFromCategories(id);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;
  const totalPages = products
    ? Math.ceil(products.length / productsPerPage)
    : 1;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products
    ? products.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="font-bold text-2xl md:text-4xl py-4 text-center">
        {categoryName}
      </h2>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2 text-lg font-bold">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          Last
        </button>
      </div>

      {/* Home Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleGoToHome}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;
