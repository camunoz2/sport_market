import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { describe, it, afterEach, expect } from "vitest";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductsPage from "../pages/ProductsPage";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { generateCategories } from "../utils/generateCategories";

const categories = generateCategories();

describe("AppRouter", () => {
  afterEach(() => {
    cleanup();
  });

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
    expect(screen.getByText(/Categorías/i)).not.toBeNull();
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

  it("renders Products page with category on /productos route", () => {
    render(
      <AuthProvider>
        <CartProvider>
          <MemoryRouter
            initialEntries={[`/productos?category=${categories[0]}`]}
          >
            <Routes>
              <Route path="/productos" element={<ProductsPage />} />
            </Routes>
          </MemoryRouter>
        </CartProvider>
      </AuthProvider>
    );
    expect(
      screen.getByRole("heading", { level: 2, name: categories[0] })
    ).not.toBeNull();
  });
});
