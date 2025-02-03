export const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center min-v-screen bg-gray-100 justify-center">
        <img className="w-180 h-auto rounded-lg" src="/NoFound.svg" alt="404" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4"></h1>
        <p className="text-xl text-gray-600">Ups! Página no encontrada</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Ir a la página principal
        </a>
      </div>
    </>
  );
};
