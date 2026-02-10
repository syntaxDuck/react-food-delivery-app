import React from "react";
import CartReducer, { defaultCartState } from "./CartReducer";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  cartActive: false,
  updateCart: (items) => {},
  clearCart: () => {},
  toggleCart: () => {},
});

export const useCart = () => React.useContext(CartContext);

const CartCtxProvider = (props) => {
  const [cartState, dispatchCartAction] = React.useReducer(
    CartReducer,
    defaultCartState
  );

  const updateCartHandler = (items) => {
    dispatchCartAction({ type: "UPDATE_CART", items: items });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const toggleCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE_CART" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    cartActive: cartState.cartActive,
    updateCart: updateCartHandler,
    clearCart: clearCartHandler,
    toggleCart: toggleCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
