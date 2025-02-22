import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import appRoutes from "./src/routes/appRoutes.js";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

export const PORT = process.env.PORT || 3000;
export const HOST = process.env.HOST || "http://localhost";

app.get("/", async (req, res) => {
  res.send("API home funcionando");
});

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "src", "data", "uploads")),
);

app.use("/api", appRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${HOST}:${PORT}`);
});
