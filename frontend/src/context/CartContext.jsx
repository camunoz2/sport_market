import { createContext, useReducer } from "react";
import useProducts from "../hooks/useProducts";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, { ...action.payload, cartId: uuidv4() }];
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.cartId !== action.payload.cartId);
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, data }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CartContext };
