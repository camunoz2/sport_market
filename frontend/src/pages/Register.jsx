import UserInput from "../components/user-input";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate("/"); // Redirige al Home
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center my-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Lado Izquierdo - Ilustración */}
        <div className="bg-gray-800 flex flex-col gap-2 items-center justify-center p-8">
          <img src="/logo.svg" alt="logo" className="w-20" />
          <h2 className="text-3xl font-bold text-white text-center md:text-left">
            Registro de usuarios
          </h2>
          <img
            src="/register.svg"
            alt="Registro"
            className="max-w-xs mx-auto md:max-w-md"
          />
        </div>

        {/* Lado Derecho - Formulario */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Ingresa tus datos
          </h2>
          <form className="flex flex-col gap-2">
            <UserInput placeholder="Nombre" />
            <UserInput placeholder="Apellido" />
            <UserInput placeholder="Email" />
            <UserInput placeholder="Dirección" />
            <UserInput placeholder="Teléfono" />
            <UserInput placeholder="Contraseña" />
            <UserInput placeholder="Confirmar contraseña" />
            <div className="flex gap-4 mt-4 flex-col md:flex-row">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-[48%]">
                Registrarse
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full md:w-[48%]">
                Cancelar
              </button>
            </div>
          </form>
          {/* Botón de regresar al Home */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleGoToHome}
              className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
            >
              Regresar al Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
