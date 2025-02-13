import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        formData
      );
      setSuccess("Usuario registrado con éxito");
      setTimeout(() => navigate("/login"), 2000); // Redirigir a la página de login después del registro exitoso
    } catch (err) {
      setError("Error al registrar el usuario", err);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center my-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
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

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Ingresa tus datos
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Dirección:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Ciudad:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">Estado:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zip">Código Postal:</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex gap-4 mt-4 flex-col md:flex-row">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full md:w-[48%] hover:bg-green-500 transition-colors"
              >
                Registrarse
              </button>
              <button
                onClick={() => navigate("/")} // Redirigir al home si se cancela el registro
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg w-full md:w-[48%] hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
          <div className="flex justify-center mt-8">

            <p className="text-gray-600">¿Ya tienes cuenta? <button
                  className="text-gray-600 font-semibold hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Iniciar Sesión
                </button></p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
