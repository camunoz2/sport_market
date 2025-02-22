import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const getStoredUser = () => {
  const email = sessionStorage.getItem("email");
  const token = sessionStorage.getItem("jwt");
  const name = sessionStorage.getItem("name");
  const id = sessionStorage.getItem("id");

  if (email && token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return { email, name, id };
  }
  return null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        const { token, email: userEmail, name, id } = data;

        sessionStorage.setItem("jwt", token);
        sessionStorage.setItem("email", userEmail);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("id", id);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser({ name, email: userEmail, id });

        return { success: true, email: userEmail, name, id };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];

    window.location.href = "/login";
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
