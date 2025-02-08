import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import UserInput from "../components/user-input";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.success) {
        alert(`Bienvenido ${response.name}`); // Use response.email instead of user.name
      }
    } catch (err) {
      console.error("Login error:", err); // Log the error details
      alert("El login falló. ¿Estás corriendo el backend?");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="shadow-lg rounded-lg w-full max-w-4xl flex flex-col md:flex-row">
        {/* Sección del formulario */}
        <div className="flex flex-col bg-gray-900 items-center text-white px-12 py-10 w-full md:w-1/2">
          <img src="/logo.svg" alt="logo" className="w-20" />
          <h2 className="text-3xl font-bold">Bienvenido</h2>
          <p className="text-xl font-light">
            Qué bueno tenerte por acá nuevamente
          </p>
          <img src="/usericon.svg" alt="user icon" className="w-16" />

          <form onSubmit={handleLogin} className="w-full">
            <UserInput
              value={email}
              onChange={setEmail}
              placeholder="Ingrese su usuario"
            />
            <UserInput
              value={password}
              onChange={setPassword}
              placeholder="Ingrese su contraseña"
            />

            <div className="flex justify-between w-full text-sm text-gray-300">
              <div className="flex gap-2">
                <p>test@test.com</p>
                <input type="checkbox" />
              </div>
              <p>La pass es 1234</p>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
            >
              Iniciar sesión
            </button>
          </form>
        </div>

        {/* Imagen de login */}
        <div className="w-full md:w-1/2">
          <img
            src="/login.png"
            alt="loginimg"
            className="object-cover w-full h-full rounded-b-lg md:rounded-r-lg md:rounded-b-none"
          />
        </div>
      </div>

      {/* Botón Volver al Home */}
      <a href="/">
        <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded">
          Volver al Home
        </button>
      </a>
    </div>
  );
}

export default Login;
