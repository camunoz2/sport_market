import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

// Define types for better code completion and error catching
export const AuthContext = createContext(null);

const getStoredUser = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("jwt");
  const name = sessionStorage.getItem("name");

  if (email && token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return { email, name };
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    console.log("Login attempt with", email);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, name, email: userEmail } = response.data; // Rename destructured email

      sessionStorage.setItem("jwt", token);
      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("name", name);

      setUser({ name, email: userEmail });

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true, email: userEmail, name: name };
    } catch (error) {
      console.error("Login error:", error); // Log the error details
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
