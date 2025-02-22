import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useProductsByUserId from "../hooks/useProductsByUserId";

import { useNavigate, Link } from "react-router";
import useDeleteProductById from "../hooks/useDeleteProduct";

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const { products, isLoading } = useProductsByUserId(user.id);
  const { mutate: deleteProduct, isLoading: isDeleting } =
    useDeleteProductById();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      fetch(`${import.meta.env.VITE_API_URL}/api/orders/${user.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error fetching orders");
          }
          return res.json();
        })
        .then((data) => {
          setOrders(data);
          setLoadingOrders(false);
        })
        .catch((error) => {
          setOrdersError(error.message);
          setLoadingOrders(false);
        });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handlePublishClick = () => {
    if (user) {
      navigate("/publicar");
    } else {
      alert("Primero debes logearte o registrarte para publicar productos");
    }
  };

  const handleEdit = (productId) => {
    if (!productId) {
      alert("Error, no hay un id para editar producto");
      return;
    }
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-medium my-4 text-center">
        ¡Bienvenido a tu perfil!
      </h1>

      {/* Datos personales */}
      <div className="w-full border-t border-gray-300 my-5"></div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-3 text-center md:text-left">
          Datos personales
        </h2>
        <p className="text-lg text-center md:text-left">
          <strong>Nombre: </strong>
          {user.name}
        </p>
        <p className="text-lg text-center md:text-left">
          <strong>Email: </strong>
          <Link to={`mailto:${user.email}`} className="text-gray-500">
            {user.email}
          </Link>
        </p>
      </div>

      {/* Orders Section */}
      <div className="w-full border-t border-gray-300 my-5"></div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-3 text-center md:text-left">
          Tus Pedidos
        </h2>
        {loadingOrders ? (
          <p>Cargando pedidos...</p>
        ) : ordersError ? (
          <p className="text-red-500">{ordersError}</p>
        ) : orders.length === 0 ? (
          <p>No tienes pedidos.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id} // Ensure your orders endpoint returns a unique id per order.
                className="p-4 border rounded shadow-sm"
              >
                <p>
                  <strong>Producto:</strong> {order.title}
                </p>
                <p>
                  <strong>Cantidad:</strong> {order.quantity}
                </p>
                <p>
                  <strong>Fecha de compra:</strong>{" "}
                  {new Date(order.purchase_date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Products Section */}
      <div className="w-full border-t border-gray-300 my-5"></div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-3 text-center md:text-left">
          Tus Productos
        </h2>
        {isLoading ? (
          <p>Cargando productos...</p>
        ) : (
          <ul className="space-y-4">
            {products?.map((product) => (
              <li
                key={product.id}
                className="p-4 border rounded shadow-sm flex gap-2"
              >
                <div>
                  <p>
                    <strong>Producto:</strong> {product.title}
                  </p>
                  <p>
                    <strong>Precio:</strong> {product.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-blue-500 hover:bg-red-400 px-2 py-2 rounded-xs text-white"
                  >
                    Editar
                  </button>
                  <button
                    disabled={isDeleting}
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-400 px-2 py-2 rounded-xs text-white"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Action Buttons */}
      <div className="w-full border-t border-gray-300 my-5"></div>
      <div className="flex flex-wrap justify-center gap-4 mt-5 w-full">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full md:w-auto"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full md:w-auto"
          onClick={handleGoHome}
        >
          Volver al Home
        </button>
        <button
          onClick={handlePublishClick}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors w-full md:w-auto"
        >
          Publicar Producto
        </button>
      </div>
    </div>
  );
};
