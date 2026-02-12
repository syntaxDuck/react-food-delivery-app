import React from 'react'

import { type CartContextValue } from "../CartTypes";
import { defaultCartState } from '../CartTypes';

const CartContext = React.createContext<CartContextValue>({
  state: defaultCartState,
  updateCart: () => undefined,
  clearCart: () => undefined,
  toggleCart: () => undefined,
});
export const useCart = (): CartContextValue => React.useContext(CartContext);
