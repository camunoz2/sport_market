import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import Login from "../pages/Login";

import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

describe("AppRouter", () => {
  it("renders Home page on default route", () => {
    render(
      <AuthProvider>
        <CartProvider>
          <MemoryRouter initialEntries={["/"]}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </AuthProvider>
    );
    expect(screen.getByText("Categorías")).not.toBeNull();
  });

  it("renders Login page on /login route", () => {
    render(
      <AuthProvider>
        <CartProvider>
          <MemoryRouter initialEntries={["/login"]}>
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </AuthProvider>
    );
    expect(screen.getByText(/Bienvenido/i)).not.toBeNull();
  });
});
