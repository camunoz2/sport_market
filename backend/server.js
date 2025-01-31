import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [{ email: "test@test.com", password: "1234" }];

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    res.json({ token: "fake-jwt-token", email: user.email });
  } else {
    res.status(401).json({ message: "credeenciales invalidas" });
  }
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "el usuario ya existe" });
  }
  users.push({ email, password });
  res.status(201).json({ message: "usuario registrado bacan" });
});

app.listen(5000, () => console.log("servido corriendo en 5000"));
