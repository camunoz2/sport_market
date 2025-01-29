const ProductCard = () => {
  return (
    <div className="border-1 border-black rounded-sm flex flex-col">
      <div className="w-full rounded-t-sm overflow-hidden flex-shrink-0">
        <img
          src="/nike.jpg"
          className="w-full h-48 object-cover"
          alt="imagen producto"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="font-bold text-xl mb-2">Producto 1</h2>
        <h3 className="text-2xl font-bold mb-4">
          $54.000 <span className="text-sm font-light">clp</span>
        </h3>

        <div className="mt-auto flex gap-2">
          <button className="border-1 border-black bg-blue-400 rounded-sm px-4 py-2 w-full">
            Agregar al carro
          </button>
          <button className="border-1 border-black rounded-sm bg-gray-300 px-4 py-2 w-full">
            Ver Producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
