import React from "react";
import CartReducer, { defaultCartState } from "./CartReducer";
import type { CartContextValue, CartItem } from "../../../types/cart";

const CartContext = React.createContext<CartContextValue>({
  state: defaultCartState,
  updateCart: () => {},
  clearCart: () => {},
  toggleCart: () => {},
});

export const useCart = (): CartContextValue => React.useContext(CartContext);

interface CartCtxProviderProps {
  children: React.ReactNode;
}

const CartCtxProvider = ({ children }: CartCtxProviderProps) => {
  const [cartState, dispatchCartAction] = React.useReducer(
    CartReducer,
    defaultCartState
  );

  const updateCartHandler = (items: CartItem[]): void => {
    dispatchCartAction({ type: "UPDATE_CART", items: items });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const toggleCartHandler = () => {
    dispatchCartAction({ type: "TOGGLE_CART" });
  };

  const cartContext: CartContextValue = {
    state: cartState,
    updateCart: updateCartHandler,
    clearCart: clearCartHandler,
    toggleCart: toggleCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
