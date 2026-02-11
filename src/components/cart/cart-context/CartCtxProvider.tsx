import React from "react";

import { type CartContextValue, type CartItemType } from "../CartTypes";
import CartReducer, { clearCart, defaultCartState, toggleCart, updateCart } from "./CartReducer";

const CartContext = React.createContext<CartContextValue>({
  state: defaultCartState,
  updateCart: () => undefined,
  clearCart: () => undefined,
  toggleCart: () => undefined,
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

  const updateCartHandler = (items: CartItemType[]): void => {
    dispatchCartAction(updateCart(items));
  };

  const clearCartHandler = () => {
    dispatchCartAction(clearCart());
  };

  const toggleCartHandler = () => {
    dispatchCartAction(toggleCart());
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
