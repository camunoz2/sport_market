import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import appRoutes from "./src/routes/appRoutes.js";
import cors from "cors";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
const port = 5454;

app.get("/", async (req, res) => {
  res.send("API home funcionando");
});

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Use the app routes
app.use("/api", appRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
