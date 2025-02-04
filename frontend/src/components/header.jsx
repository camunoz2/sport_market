import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { user, logout, setUser } = useAuth();
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const token = sessionStorage.getItem("jwt");
      const email = sessionStorage.getItem("email");
      if (token && email) {
        setUser({ email });
      }
    };

    loadUser();
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, [setUser]);

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("email");
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a href="/">
            <img src="/logo.svg" alt="Logo" className="h-8 mr-4" />
          </a>
          <nav className="flex gap-2 items-center">
            <button
              className="block md:inline text-white font-bold hover:underline mt-2 md:mt-0 px-3"
              onClick={() => navigate("/registro")}
            >
              Registrarses
            </button>
            <div className="flex items-center">
              {user ? (
                <>
                  <button
                    className="text-white font-bold hover:underline"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </button>
                  <div
                    className="relative cursor-pointer hidden md:block"
                    onClick={() => navigate("/cart")}
                  >
                    <img src="/carticon.svg" alt="Carrito" className="h-8" />
                    <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                      {cart.length}
                    </span>
                  </div>
                </>
              ) : (
                <button
                  className="text-white font-bold hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </nav>
        </div>
        {/* Carrito en móviles */}
        {user && (
          <div
            className="md:hidden fixed bottom-4 right-4 bg-gray-800 p-3 rounded-full shadow-lg cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <img src="/carticon.svg" alt="Carrito" className="h-8" />
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-100 bg-red-600 rounded-full">
              3
            </span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
