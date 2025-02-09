const express = require("express");
const path = require("path");
const categoriesRouter = require("./routes/categories");

const app = express();
const port = 5000;

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Use the categories router
app.use("/api", categoriesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
