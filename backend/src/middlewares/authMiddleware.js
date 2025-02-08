export const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
    // Aquí podrías verificar el token con alguna librería como jwt
    next();
  };
  