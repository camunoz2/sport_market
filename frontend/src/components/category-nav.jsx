import { useState, useContext } from "react";
import { Menu, X } from "lucide-react"; // Importamos iconos para el menú
import useCategories from "../hooks/useCategories";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isError, error, data, isLoading } = useCategories();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePublishClick = () => {
    if (user) {
      navigate("/publicar");
    } else {
      alert("Primero debes logearte o registrarte para publicar productos");
    }
  };

  if (isLoading) {
    <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <nav className="bg-blue-500 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          {data?.categories.map((category) => (
            <a
              key={category.id}
              href={`/productos?category=${category.name}`} // Ruta con filtro por categoría
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>

        {/* Botón Publicar */}
        <button
          onClick={handlePublishClick}
          className="bg-green-500 font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors hidden md:block"
        >
          Publicar Producto
        </button>

        {/* Botón Hamburguesa para móviles */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {isOpen && (
        <div className="md:hidden bg-blue-600 text-white flex flex-col items-center py-4 space-y-3">
          {data.map((category) => (
            <a
              key={category.id}
              href={`/productos?category=${category.name}`} // Ruta con filtro por categoría
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {category.name}
            </a>
          ))}
          <button
            onClick={handlePublishClick}
            className="bg-green-500 font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Publicar Producto
          </button>
        </div>
      )}
    </nav>
  );
};

export default CategoryNav;
