import { useParams, useNavigate } from "react-router-dom";
import { generateProduct } from "../utils/fakerjs";

const ProductDetail = () => {
  let params = useParams();
  const navigate = useNavigate();
  const product = generateProduct();

  if (!product) {
    return <p className="text-center text-red-500 text-lg">Producto no encontrado.</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6 flex flex-col md:flex-row items-center">
        {/* Imagen del producto */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="object-cover w-80 h-80 rounded-lg shadow-md" />
        </div>

        {/* Información del producto */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 p-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p><span className="font-semibold">Marca:</span> {product.brand}</p>
          <p><span className="font-semibold">Categoría:</span> {product.category}</p>
          <p><span className="font-semibold">Precio:</span> ${product.price}</p>
          <p><span className="font-semibold">Tamaños disponibles:</span> {product.sizes.join(", ")}</p>
          <p><span className="font-semibold">Stock:</span> {product.stock}</p>
        </div>
      </div>

      {/* Botón Volver al Home */}
      <button onClick={() => navigate("/")} className="mt-6 bg-green-500 text-white px-6 py-2 rounded">
        Volver al Home
      </button>
    </div>
  );
};

export default ProductDetail;
