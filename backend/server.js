import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js"; // Asegúrate de que esta ruta sea correcta

const app = express();
app.use(express.json());
app.use(cors());

// Usa las rutas de autenticación
app.use("/api", authRoutes);  // Esto establecerá las rutas /api/login y /api/register

app.listen(5000, () => {
  console.log("Servidor corriendo en el puerto 5000");
});

