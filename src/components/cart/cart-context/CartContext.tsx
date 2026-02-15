import React from "react";

import { type CartContextValue, defaultCartState } from "../CartTypes";

export const CartContext = React.createContext<CartContextValue>({
  state: defaultCartState,
  updateCart: () => undefined,
  removeItem: () => undefined,
  clearCart: () => undefined,
  toggleCart: () => undefined,
});

export const useCart = (): CartContextValue => React.useContext(CartContext);
