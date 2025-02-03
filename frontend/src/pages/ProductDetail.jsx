import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

export default function ProductView({ product }) {
  const { addToCart } = useContext(CartContext); // Add to cart from context
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 flex flex-col md:flex-row items-center">
        {/* Product Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.title}
            alt={product.title}
            className="object-cover w-80 h-80 rounded-lg shadow-md"
          />
        </div>

        {/* Product Information */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 p-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>

          <p>
            <span className="font-semibold">Categoría:</span> {product.category}
          </p>
          <p>
            <span className="font-semibold">Precio:</span> ${product.price}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded mt-4"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
      >
        Volver al Home
      </button>
    </div>
  );
}

ProductView.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};
