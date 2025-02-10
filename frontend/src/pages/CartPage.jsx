import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tu Carrito</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartId}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-gray-900">
                    ${parseFloat(item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-2xl font-bold text-gray-900">
                ${total.toFixed(2)}
              </p>
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded w-full text-center mt-4"
              onClick={() => alert("Checkout not implemented yet!")}
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>

      <a
        href="/"
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
      >
        Volver al Home
      </a>
    </div>
  );
}
