import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const email = sessionStorage.getItem("email");
    return email ? { email } : null;
  });

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });
    const { token, email: userEmail } = response.data;

    sessionStorage.setItem("jwt", token);
    sessionStorage.setItem("email", userEmail);

    setUser({ email: userEmail });

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("email");

    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

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
