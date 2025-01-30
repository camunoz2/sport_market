import PropTypes from "prop-types";

const CategoryNav = ({ categories }) => {
  return (
    <div className="bg-blue-400">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <span
              key={category}
              className="text-gray-700 hover:text-blue-600 cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>

        <button className="bg-green-500 font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Publicar Producto
        </button>
      </div>
    </div>
  );
};

export default CategoryNav;

CategoryNav.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};
