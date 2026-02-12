import React from "react";

import { ClearCartAction, ToggleCartAction, UpdateCartAction } from "../CartTypes";
import { type CartContextValue, type CartItemType } from "../CartTypes";
import { defaultCartState } from "../CartTypes";
import CartReducer from "./CartReducer";

const CartContext = React.createContext<CartContextValue>({
  state: defaultCartState,
  updateCart: () => undefined,
  clearCart: () => undefined,
  toggleCart: () => undefined,
});

interface CartCtxProviderProps {
  children: React.ReactNode;
}

const CartCtxProvider = ({ children }: CartCtxProviderProps) => {
  const [cartState, dispatchCartAction] = React.useReducer(
    CartReducer,
    defaultCartState
  );

  const updateCartHandler = (items: CartItemType[]): void => {
    dispatchCartAction(UpdateCartAction(items));
  };

  const clearCartHandler = () => {
    dispatchCartAction(ClearCartAction());
  };

  const toggleCartHandler = () => {
    dispatchCartAction(ToggleCartAction());
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
