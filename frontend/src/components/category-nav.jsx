import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, X } from "lucide-react"; // Importamos iconos para el menú

const CategoryNav = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          {categories.map((category) => (
            <a
              key={category}
              href="/productos" // Ruta hacia la página de productos
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {category}
            </a>
          ))}
        </div>

        {/* Botón Publicar */}
        <a
          href="/publicar"
          className="bg-green-500 font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors hidden md:block"
        >
          Publicar Producto
        </a>

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
          {categories.map((category) => (
            <a
              key={category}
              href="/productos" // Ruta hacia la página de productos
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {category}
            </a>
          ))}
          <a
            href="/publicar"
            className="bg-green-500 font-bold px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Publicar Producto
          </a>
        </div>
      )}
    </nav>
  );
};

export default CategoryNav;

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
