import { createContext, useReducer, useContext } from "react";
import useProducts from "../hooks/useProducts";
import PropTypes from "prop-types";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useReducer(cartReducer, []);
  const { loading, error } = useProducts();

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
