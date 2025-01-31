import UserInput from "../components/user-input";

function Register() {
  return (
    <div className="bg-gray-100 flex items-center justify-center my-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-2">
        {/* Lado Izquierdo - Ilustración */}
        <div className="bg-gray-800 flex flex-col gap-2 items-center justify-center p-8">
          <img src="/logo.svg" alt="logo" className="w-20" />
          <h2 className="text-3xl font-bold text-white">
            Registro de usuarios
          </h2>
          <img
            src="/register.svg"
            alt="Registro"
            className="max-w-xs mx-auto"
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
            <UserInput placeholder="Direccion" />
            <UserInput placeholder="Telefono" />
            <UserInput placeholder="Contraseña" />
            <UserInput placeholder="Confirmar contraseña" />
            <div className="flex gap-4 mt-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
                Registrarse
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
