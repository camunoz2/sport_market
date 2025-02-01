import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = () => {
      const token = sessionStorage.getItem("jwt");
      const email = sessionStorage.getItem("email");
      if (token && email) {
        // Set the user in the AuthContext
        setUser({ email });
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, [setUser]);

  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("email");
    logout();
    navigate("/login");
  };

  return (
    <header className="p-4 bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-10" />
        </a>

        <div className="flex items-center">
          {user ? (
            <>
              <div className="flex flex-col mr-4">
                <span className="text-white">Holas, {user.email}</span>
                <button
                  className="text-white font-bold hover:underline"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
              <div className="relative">
                <img src="/carticon.svg" alt="Carrito" className="h-8" />
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  3
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
      </div>
    </header>
  );
};

export default Header;
