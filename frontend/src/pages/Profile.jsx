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

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-medium my-4">¡Bienvenido a tu perfil!</h1>
        <div className="w-5/6 border-t-[0.1px] border-gray-300 my-5"></div>
        <div className="w-5/6">
          <h2 className="text-2xl font-medium mb-3">Datos personales</h2>
          <p className="text-lg">
            <strong>Nombre: </strong>
            {user.name}
          </p>
          <p className="text-lg">
            <strong>Email: </strong>
            <a href="mailto:correo@correo.cl" className="text-gray-500">
              {user.email}
            </a>
          </p>
        </div>
        <div className="w-5/6 border-t-[0.1px] border-gray-300 my-5"></div>
        <div className="flex gap-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleGoHome}
          >
            Volver al Home
          </button>
        </div>
      </div>
    </>
  );
};
