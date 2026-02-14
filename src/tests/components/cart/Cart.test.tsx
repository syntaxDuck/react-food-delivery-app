import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { vi } from "vitest";

import Cart from "../../../components/cart/Cart";
import { useCart } from "../../../components/cart/cart-context/CartContext";
import type { CartItemType } from "../../../components/cart/CartTypes";
import { render, screen } from "../test-utils";

const item: CartItemType = {
  id: "item-1",
  name: "Sushi Roll",
  price: 12.5,
  amount: 1
};

const CartHarness = () => {
  const { updateCart, toggleCart } = useCart();

  useEffect(() => {
    updateCart([item]);
    toggleCart();
  }, [updateCart, toggleCart]);

  return <Cart />;
};

describe("Cart", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("shows success message after submitting order", async () => {
    const user = userEvent.setup();
    
    render(
      <CartHarness />,
      { includeAuth: true, includeCart: true }
    );

    await user.click(screen.getByRole("button", { name: /submit order/i }));
    expect(
      await screen.findByText(/order submitted successfully/i)
    ).toBeInTheDocument();
  });

  test("shows error message when submission fails", async () => {
    const user = userEvent.setup();
    
    render(
      <CartHarness />,
      { includeAuth: true, includeCart: true }
    );

    await user.click(screen.getByRole("button", { name: /submit order/i }));

    expect(
      await screen.findByText(/http error/i)
    ).toBeInTheDocument();
  });
});
