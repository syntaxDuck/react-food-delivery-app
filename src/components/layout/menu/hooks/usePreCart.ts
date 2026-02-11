import { useState, useMemo, useCallback } from "react";
import { useCart } from "../../../cart/cart-context/CartCtxProvider";
import type { CartItemType } from "../../../cart/CartTypes";

export const usePreCart = () => {
  const updateCart = useCart().updateCart;
  const [preCart, setPreCart] = useState<CartItemType[]>([]);

  const itemAmountsMap = useMemo(() => {
    const map = new Map<string, number>();
    preCart.forEach(item => {
      map.set(item.id, item.amount);
    });
    return map;
  }, [preCart]);

  const addToPreCartHandler = useCallback((newItem: CartItemType) => {
    setPreCart((prevState) => {
      const existingCartItemIndex = prevState.findIndex(
        (item: CartItemType) => item.id === newItem.id
      );

      if (existingCartItemIndex >= 0) {
        const newState = prevState.filter((item: CartItemType) => item.id !== newItem.id);

        if (newItem.amount === 0) {
          return newState;
        }
        return [...newState, newItem];
      } else {
        return [...prevState, newItem];
      }
    });
  }, []);

  const updateCartHandler = useCallback<React.FormEventHandler>((event) => {
    event.preventDefault();
    if (preCart.length !== 0) {
      setPreCart([]);
      updateCart(preCart);
    }
  }, [preCart, updateCart]);

  const clearPreCart = useCallback(() => {
    setPreCart([]);
  }, []);

  return {
    preCart,
    itemAmountsMap,
    addToPreCartHandler,
    updateCartHandler,
    clearPreCart,
    hasItems: preCart.length > 0
  };
};