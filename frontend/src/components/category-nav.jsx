const CategoryNav = () => {
  return (
    <div className="bg-blue-400">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex space-x-6">
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
           Zapatilla
          </span>
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Categoria 2
          </span>
          <span className="text-gray-700 hover:text-blue-600 cursor-pointer">
            Categoria 3
          </span>
        </div>

        <button className="bg-green-500 font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Publicar Producto
        </button>
      </div>
    </div>
  );
};

export default CategoryNav;
