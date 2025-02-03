import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const ProductCard = ({ product, addToCart }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (user) {
      addToCart(product);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="border border-black rounded-sm flex flex-col">
      <div className="w-full rounded-t-sm overflow-hidden flex-shrink-0">
        <img
          src={product.image || "/images/default-product.png"} // Imagen por defecto
          className="w-full h-48 object-cover"
          alt={product.title || "Imagen del producto"}
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-xl mb-2">{product.title || "Producto sin título"}</h2>
        <h3 className="text-2xl font-bold mb-4">
          {product.price ? `${product.price} clp` : "Precio no disponible"}
        </h3>

        <div className="mt-auto flex gap-2">
          <button
            onClick={handleAddToCart}
            className="cursor-pointer border border-black bg-blue-400 rounded-sm px-4 py-2 w-full text-center hover:bg-blue-600"
          >
            Agregar al carro
          </button>
          <a
            href={`/productos/${product.id}`}
            className="border border-black rounded-sm bg-gray-300 px-4 py-2 w-full text-center cursor-pointer hover:bg-gray-500"
          >
            Ver Producto
          </a>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
