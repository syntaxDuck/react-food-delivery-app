import { describe, expect, test } from "vitest";

import { ClearCartAction, defaultCartState, ToggleCartAction, UpdateCartAction } from "../CartTypes";
import type { CartItemType, CartState } from "../CartTypes";
import CartReducer from "./CartReducer";

const createItem = (overrides: Partial<CartItemType> = {}): CartItemType => ({
  id: "item-1",
  name: "Sushi",
  price: 12,
  amount: 1,
  ...overrides,
});

describe("CartReducer", () => {
  test("updates cart with new items and recalculates total", () => {
    const state: CartState = { ...defaultCartState };
    const items = [createItem({ amount: 2, price: 10 })];

    const result = CartReducer(state, UpdateCartAction(items));

    expect(result.items).toHaveLength(1);
    expect(result.totalAmount).toBe(20);
  });

  test("replaces existing item amount when updating", () => {
    const state: CartState = {
      ...defaultCartState,
      items: [createItem({ amount: 1, price: 8 })],
      totalAmount: 8,
    };

    const result = CartReducer(state, UpdateCartAction([createItem({ amount: 3, price: 8 })]));

    expect(result.items).toHaveLength(1);
    expect(result.items[0].amount).toBe(3);
    expect(result.totalAmount).toBe(24);
  });

  test("toggles cart active state", () => {
    const result = CartReducer(defaultCartState, ToggleCartAction());
    expect(result.cartActive).toBe(true);
  });

  test("clears cart items and total amount", () => {
    const state: CartState = {
      ...defaultCartState,
      items: [createItem({ amount: 2, price: 5 })],
      totalAmount: 10,
    };

    const result = CartReducer(state, ClearCartAction());

    expect(result.items).toEqual([]);
    expect(result.totalAmount).toBe(0);
  });
});
