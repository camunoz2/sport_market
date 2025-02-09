import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import appRoutes from "./src/routes/appRoutes.js";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "src/assets")));

// Use the app routes
app.use("/api", appRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
