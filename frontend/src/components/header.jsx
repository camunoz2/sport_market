import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Search } from "lucide-react";

const Header = ({ products }) => {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <header className="p-4 bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-10" />
        </a>

        {/* Buscador */}
        <form onSubmit={handleSearch} className="relative flex items-center w-1/2">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="w-full p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none bg-white"  // Aquí se agregó 'bg-white'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 text-gray-500" size={20} />
        </form>
        <div className="flex items-center">
          {user ? (
            <>
              <div className="flex flex-col mr-4">
                <a className="text-white font-bold text-center" href="/profile">Mi Perfil</a>
                <span className="text-white">Hola, {user.email}</span>
                <button className="text-white font-bold hover:underline" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>
              <div className="relative">
                <img src="/carticon.svg" alt="Carrito" className="h-8" />
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-red-100 bg-red-600 rounded-full">
                  3
                </span>
              </div>
            </>
          ) : (
            <button className="text-white font-bold hover:underline" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
