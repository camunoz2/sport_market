import { createContext, useReducer } from "react";
import useProducts from "../hooks/useProducts";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, { ...action.payload, cartId: uuidv4(), quantity: 1 }];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.cartId !== action.payload.cartId);
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.cartId === action.payload.cartId
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const { data } = useProducts();

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const updateQuantity = (cartId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, data }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartContext };

