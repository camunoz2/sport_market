import { useState } from "react";
import { useNavigate } from "react-router";

const CreateListing = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  let navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handlePublishClick = () => {
    // Verificar si el usuario está autenticado en el localStorage (puedes usar otro método según tu lógica)
    const isAuthenticated = sessionStorage.getItem("jwt");

    if (isAuthenticated) {
      // Si está autenticado, continuar con la publicación
      // Aquí puedes agregar la lógica para enviar los datos del formulario
      alert("Producto publicado con éxito");
    } else {
      // Si no está autenticado, redirigir al login
      navigate("/login");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-sm p-6 flex flex-col lg:flex-row w-full max-w-4xl border border-black">
      {/* Sección de Imagen */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center border-b lg:border-r lg:border-b-0 lg:pr-4 mb-6 lg:mb-0">
        <label className="cursor-pointer w-full flex flex-col items-center border border-gray-300 p-6 rounded-lg text-center">
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="text-gray-500">Agregar Imagen</div>
          )}
          <input type="file" className="hidden" onChange={handleImageChange} />
        </label>
      </div>

      {/* Sección de Formulario */}
      <div className="w-full lg:w-1/2 lg:pl-4">
        <h2 className="text-xl font-bold mb-4">Datos del producto</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Botones */}
        <div className="flex flex-col lg:flex-row justify-between">
          <button
            onClick={handlePublishClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 lg:mb-0 cursor-pointer"
          >
            Publicar
          </button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer">
            Cancelar
          </button>
        </div>
        {/* Botón Volver al Home */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded cursor-pointer"
        >
          Volver al Home
        </button>
      </div>
    </div>
  );
};

export default CreateListing;
