import { useContext, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { formatNumber } from "../utils/formatNumber.js";

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeItem } =
    useContext(CartContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("success");

    if (paymentStatus) {
      alert(paymentStatus === "true" ? "Pago exitoso!" : "Pago fallido!");
    }

    navigate("/cart", { replace: true });
  }, [location.search]);

  const handlePay = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: cart, userId: user.id }),
      });
      const data = await response.json();
      if (response.ok) {
        window.location.href = data.url;
      } else {
        console.error("El pago falló:", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Tu Carrito
        </h1>

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:justify-between bg-gray-50 p-4 rounded-lg shadow-sm gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <p className="text-gray-500 text-sm">
                      Precio: ${formatNumber(item.price)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-3 rounded"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-bold text-gray-900">
                    ${formatNumber(item.price * item.quantity)}
                  </p>

                  <button
                    onClick={() => removeItem(item)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg text-lg">
              <p className="font-semibold">Total:</p>
              <p className="text-2xl font-bold text-gray-900">
                ${formatNumber(total)}
              </p>
            </div>

            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded w-full text-center mt-4"
              onClick={handlePay}
            >
              Proceder al Pago
            </button>
          </div>
        )}
      </div>

      <Link
        to="/"
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
      >
        Volver al Home
      </Link>
    </div>
  );
}
