import { useEffect } from "react";
import { createContext, useReducer } from "react";
import useProducts from "../hooks/useProducts";
import PropTypes from "prop-types";

const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "DECREASE_QUANTITY":
      return state
        .map((item) => {
          if (item.id === action.payload.id) {
            const updatedQuantity = item.quantity - 1;
            return updatedQuantity > 0
              ? { ...item, quantity: updatedQuantity }
              : null;
          }
          return item;
        })
        .filter(Boolean);

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload.id);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const initialState = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const { data } = useProducts();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const decreaseQuantity = (product) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  const removeItem = (product) => {
    dispatch({ type: "REMOVE_ITEM", payload: product });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, decreaseQuantity, data, clearCart, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartContext };
