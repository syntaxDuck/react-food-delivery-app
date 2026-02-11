import { act,renderHook } from "@testing-library/react";

import CartCtxProvider, { useCart } from "../../../cart/cart-context/CartCtxProvider";
import type { CartItemType } from "../../../cart/CartTypes";
import { usePreCart } from "./usePreCart";

const createItem = (overrides: Partial<CartItemType> = {}): CartItemType => ({
  id: "item-1",
  name: "Sushi",
  price: 10,
  amount: 1,
  ...overrides,
});

describe("usePreCart", () => {
  test("adds and updates items in pre-cart", () => {
    const { result } = renderHook(
      () => ({ preCart: usePreCart(), cart: useCart() }),
      { wrapper: CartCtxProvider }
    );

    act(() => {
      result.current.preCart.addToPreCartHandler(createItem({ amount: 2 }));
    });

    expect(result.current.preCart.preCart).toHaveLength(1);
    expect(result.current.preCart.itemAmountsMap.get("item-1")).toBe(2);

    act(() => {
      result.current.preCart.addToPreCartHandler(createItem({ amount: 0 }));
    });

    expect(result.current.preCart.preCart).toHaveLength(0);
    expect(result.current.preCart.hasItems).toBe(false);
  });

  test("submits pre-cart items into cart", () => {
    const { result } = renderHook(
      () => ({ preCart: usePreCart(), cart: useCart() }),
      { wrapper: CartCtxProvider }
    );

    act(() => {
      result.current.preCart.addToPreCartHandler(createItem({ amount: 3 }));
    });

    act(() => {
      result.current.preCart.updateCartHandler({
        preventDefault: () => undefined,
      } as React.FormEvent);
    });

    expect(result.current.cart.state.items).toHaveLength(1);
    expect(result.current.cart.state.items[0].amount).toBe(3);
    expect(result.current.preCart.preCart).toHaveLength(0);
  });
});
