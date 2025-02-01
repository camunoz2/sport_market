import { useState } from "react";
import UserInput from "../components/user-input";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert(`Bienvenido ${user.email}`);
    } catch (err) {
      alert("El login fallo. Estas corriendo el backend??", err);
    }
  };

  return (
    <div className="grid grid-cols-2 border border-black rounded-sm w-2/3 my-10">
      <div className="flex flex-col bg-gray-900 items-center text-white px-12 gap-4 py-10">
        <img src="/logo.svg" alt="logo" className="w-20" />
        <h2 className="text-3xl font-bold">Bienvenido</h2>
        <p className="text-xl font-light">
          Que bueno tenerte por aca nuevamente
        </p>
        <img src="/usericon.svg" alt="user icon" className="w-16" />
        <form onSubmit={handleLogin}>
          <UserInput
            value={email}
            onChange={setEmail}
            placeholder="ingrese su usuario"
          />
          <UserInput
            value={password}
            onChange={setPassword}
            placeholder="ingrese su pass"
          />
          <div className="flex justify-between w-full">
            <div className="flex gap-2">
              <p>test@test.com</p>
              <input type="checkbox" />
            </div>
            <div>
              <p>la pass es 1234</p>
            </div>
          </div>
          <button
            type="submit"
            className="border-sm bg-blue-400 py-2 px-2 rounded-sm w-full"
          >
            Iniciar
          </button>
        </form>
      </div>
      <div className="relative">
        <img src="/login.png" alt="loginimg" className="object-cover" />
      </div>
    </div>
  );
}

export default Login;
