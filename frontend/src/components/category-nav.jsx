import { useState } from "react";
import { Menu, X } from "lucide-react"; // Importamos iconos para el menú
import useCategories from "../hooks/useCategories";

const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useCategories();

  return (
    <nav className="bg-blue-500 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          {data?.categories.map((category) => (
            <a
              key={category.id}
              href={`/categories/${category.id}`}
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>

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
          {data?.categories.map((category) => (
            <a
              key={category.id}
              href={`/categories/${category.id}`}
              className="hover:text-gray-300 cursor-pointer transition-colors"
            >
              {category.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default CategoryNav;
