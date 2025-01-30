import PropTypes from "prop-types";

const ProductCard = ({ title, price, image, id }) => {
  return (
    <div className="border-1 border-black rounded-sm flex flex-col">
      <div className="w-full rounded-t-sm overflow-hidden flex-shrink-0">
        <img
          src={image}
          className="w-full h-48 object-cover"
          alt="imagen producto"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <h3 className="text-2xl font-bold mb-4">
          {price} <span className="text-sm font-light">clp</span>
        </h3>

        <div className="mt-auto flex gap-2">
          <button className="border-1 border-black bg-blue-400 rounded-sm px-4 py-2 w-full">
            Agregar al carro
          </button>
          <a
            href={`productos/${id}`}
            className="border-1 border-black rounded-sm bg-gray-300 px-4 py-2 w-full"
          >
            Ver Producto
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
