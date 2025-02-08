import express from "express";
import cors from "cors";
import fs from "node:fs";

let usersRawData = fs.readFileSync("./data/users.json");
let usersJson = JSON.parse(usersRawData);

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/login", (req, res) => {
  console.log("Login!!");
  const { email, password } = req.body;
  const user = usersJson.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (user) {
    res.json({ token: "fake-jwt-token", email: user.email, name: user.name });
  } else {
    res.status(401).json({ message: "credeenciales invalidas" });
  }
});

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "el usuario ya existe" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "usuario registrado bacan" });
});

app.listen(5000, () => console.log("servido corriendo en 5000"));
