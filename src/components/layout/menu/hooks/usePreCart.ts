import { useCallback, useMemo, useState } from "react";

import { useCart } from "../../../cart/cart-context/CartContext";
import type { CartItemType } from "../../../cart/CartTypes";

export const usePreCart = () => {
  const updateCart = useCart().updateCart;
  const [preCart, setPreCart] = useState<CartItemType[]>([]);
  const [isSubmittingToCart, setIsSubmittingToCart] = useState(false);

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

  const addItemToCartHandler = useCallback((item: CartItemType) => {
    const itemToAdd = {
      ...item,
      amount: item.amount > 0 ? item.amount : 1,
    };
    updateCart([itemToAdd]);
    setPreCart((prevState) => prevState.filter((currentItem) => currentItem.id !== item.id));
  }, [updateCart]);

  const updateCartHandler = useCallback<React.EventHandler<React.SyntheticEvent<HTMLFormElement>>>((event) => {
    event.preventDefault();
    if (preCart.length === 0 || isSubmittingToCart) {
      return;
    }

    setIsSubmittingToCart(true);
    setPreCart([]);
    updateCart(preCart);

    window.setTimeout(() => {
      setIsSubmittingToCart(false);
    }, 0);
  }, [isSubmittingToCart, preCart, updateCart]);

  const clearPreCart = useCallback(() => {
    setPreCart([]);
  }, []);

  return {
    preCart,
    itemAmountsMap,
    addToPreCartHandler,
    addItemToCartHandler,
    updateCartHandler,
    clearPreCart,
    isSubmittingToCart,
    hasItems: preCart.length > 0
  };
};
