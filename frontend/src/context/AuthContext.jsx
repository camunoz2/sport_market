import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

const getStoredUser = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("jwt");
  if (email && token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return { email };
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = async (email, password, callback) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const { token, email: userEmail } = response.data;

      sessionStorage.setItem("jwt", token);
      sessionStorage.setItem("email", userEmail);

      setUser({ email: userEmail });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Call the callback once user is set
      if (callback) callback(userEmail);
    } catch (err) {
      throw new Error("El login falló.", err);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("email");

    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    if (user) {
      const token = sessionStorage.getItem("jwt");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
