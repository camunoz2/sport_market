import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header
      className="bg-gray-800 text-white p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a href="/" whileHover={{ scale: 1.1 }}>
            <img src="/logo.svg" alt="Logo" className="h-10 mr-4" />
          </motion.a>

          {/* Navegación */}
          <nav className="flex gap-6 items-center">
            {user ? (
              <motion.div
                className="flex text-center flex-col text-white"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-sm">Hola, {user.name}</span>
                <motion.a
                  href="/profile"
                  className="font-bold hover:underline"
                  whileHover={{ scale: 1.1, color: "#fbbf24" }} // Cambia a amarillo al pasar el cursor
                >
                  Ingresar al perfil
                </motion.a>
              </motion.div>
            ) : (
              <motion.button
                className="text-white font-bold hover:underline px-3"
                onClick={() => navigate("/registro")}
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
              >
                Registrar
              </motion.button>
            )}

            {/* Carrito */}
            {user ? (
              <>
                <motion.button
                  className="text-white font-bold hover:underline"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.1, color: "#f87171" }} // Rojo claro al pasar el cursor
                >
                  Cerrar Sesión
                </motion.button>

                <motion.div
                  className="relative cursor-pointer hidden md:block"
                  onClick={() => navigate("/cart")}
                  whileHover={{ scale: 1.2 }}
                  animate={{ y: [0, -2, 0] }} // Pequeño rebote
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <img src="/carticon.svg" alt="Carrito" className="h-8" />
                  <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                    {cart.length}
                  </span>
                </motion.div>
              </>
            ) : (
              <motion.button
                className="text-white font-bold hover:underline"
                onClick={() => navigate("/login")}
                whileHover={{ scale: 1.1, color: "#fbbf24" }}
              >
                Iniciar Sesión
              </motion.button>
            )}
          </nav>
        </div>

        {/* Carrito en móviles */}
        {user && (
          <motion.div
            className="md:hidden fixed bottom-4 right-4 bg-gray-800 p-3 rounded-full shadow-lg cursor-pointer"
            onClick={() => navigate("/cart")}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileTap={{ scale: 0.9 }}
          >
            <img src="/carticon.svg" alt="Carrito" className="h-8" />
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-100 bg-red-600 rounded-full">
              {cart.length}
            </span>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
