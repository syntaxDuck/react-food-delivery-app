import type { CartItemType, CartState } from "../CartTypes";
import CartReducer, {
  clearCart,
  defaultCartState,
  toggleCart,
  updateCart,
} from "./CartReducer";

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

    const result = CartReducer(state, updateCart(items));

    expect(result.items).toHaveLength(1);
    expect(result.totalAmount).toBe(20);
  });

  test("replaces existing item amount when updating", () => {
    const state: CartState = {
      ...defaultCartState,
      items: [createItem({ amount: 1, price: 8 })],
      totalAmount: 8,
    };

    const result = CartReducer(state, updateCart([createItem({ amount: 3, price: 8 })]));

    expect(result.items).toHaveLength(1);
    expect(result.items[0].amount).toBe(3);
    expect(result.totalAmount).toBe(24);
  });

  test("toggles cart active state", () => {
    const result = CartReducer(defaultCartState, toggleCart());
    expect(result.cartActive).toBe(true);
  });

  test("clears cart items and total amount", () => {
    const state: CartState = {
      ...defaultCartState,
      items: [createItem({ amount: 2, price: 5 })],
      totalAmount: 10,
    };

    const result = CartReducer(state, clearCart());

    expect(result.items).toEqual([]);
    expect(result.totalAmount).toBe(0);
  });
});
