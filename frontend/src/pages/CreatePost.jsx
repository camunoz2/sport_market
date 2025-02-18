import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import useCategories from "../hooks/useCategories";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const { data, isLoading, isError, error } = useCategories();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isError) {
    return <div>Error, {error.message}</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handlePublishClick = async () => {
    if (user) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("image", image);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/post`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        alert("Producto publicado con éxito");
        navigate(`/productos/${response.data.id}`);
      } catch (error) {
        alert("Error publicando el producto: " + error.message);
      }
    } else {
      alert("Primero debes logearte o registrarte para publicar productos");
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
              src={URL.createObjectURL(image)}
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Seleccionar Categoría</option>
          {isLoading && <option>Loading...</option>}
          {isError && <option>Error loading categories {error.message}</option>}
          {data?.categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Botones */}
        <div className="flex flex-col lg:flex-row justify-between">
          <button
            onClick={handlePublishClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-2 lg:mb-0 cursor-pointer"
          >
            Publicar
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
