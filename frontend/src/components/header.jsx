const Header = () => {
  return (
    <header className="p-4 bg-gray-800 shadow-md">
      <div className="container mx-auto flex items-center justify-between ">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-10" />
        </a>

        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-white">Hola, Jesus</span>
            <span className="text-white font-bold">Mis Compras</span>
          </div>
          <div className="relative">
            <img src="/carticon.svg" alt="Carrito" className="h-8" />
            <span className="absolute bottom-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
