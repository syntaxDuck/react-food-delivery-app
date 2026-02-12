import React, { useCallback, useMemo } from "react";

import { ClearCartAction, ToggleCartAction, UpdateCartAction } from "../CartTypes";
import { type CartContextValue, type CartItemType, defaultCartState } from "../CartTypes";
import { CartContext } from "./CartContext";
import CartReducer from "./CartReducer";

interface CartCtxProviderProps {
  children: React.ReactNode;
}

const CartCtxProvider = ({ children }: CartCtxProviderProps) => {
  const [cartState, dispatchCartAction] = React.useReducer(
    CartReducer,
    defaultCartState
  );

  const updateCartHandler = useCallback((items: CartItemType[]): void => {
    dispatchCartAction(UpdateCartAction(items));
  }, []);

  const clearCartHandler = useCallback(() => {
    dispatchCartAction(ClearCartAction());
  }, []);

  const toggleCartHandler = useCallback(() => {
    dispatchCartAction(ToggleCartAction());
  }, []);

  const cartContext: CartContextValue = useMemo(() => ({
    state: cartState,
    updateCart: updateCartHandler,
    clearCart: clearCartHandler,
    toggleCart: toggleCartHandler,
  }), [cartState, updateCartHandler, clearCartHandler, toggleCartHandler]);

  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
