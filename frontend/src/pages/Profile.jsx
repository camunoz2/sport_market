import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handlePublishClick = () => {
    if (user) {
      navigate("/publicar");
    } else {
      alert("Primero debes logearte o registrarte para publicar productos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl md:text-4xl font-medium my-4 text-center">¡Bienvenido a tu perfil!</h1>
      <div className="w-full border-t-[0.1px] border-gray-300 my-5"></div>
      <div className="w-full">
        <h2 className="text-2xl font-medium mb-3 text-center md:text-left">Datos personales</h2>
        <p className="text-lg text-center md:text-left">
          <strong>Nombre: </strong>
          {user.name}
        </p>
        <p className="text-lg text-center md:text-left">
          <strong>Email: </strong>
          <a href={`mailto:${user.email}`} className="text-gray-500">
            {user.email}
          </a>
        </p>
      </div>
      <div className="w-full border-t-[0.1px] border-gray-300 my-5"></div>
      <div className="flex flex-wrap justify-center gap-4 mt-5 w-full">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors w-full md:w-auto"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full md:w-auto"
          onClick={handleGoHome}
        >
          Volver al Home
        </button>
        <button
          onClick={handlePublishClick}
          className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors w-full md:w-auto"
        >
          Publicar Producto
        </button>
      </div>
    </div>
  );
};
