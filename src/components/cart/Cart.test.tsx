import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { vi } from "vitest";

import Cart from "./Cart";
import CartCtxProvider, { useCart } from "./cart-context/CartCtxProvider";
import type { CartItemType } from "./CartTypes";

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
    const fetchMock = vi.mocked(fetch);

    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    } as Response);

    render(
      <CartCtxProvider>
        <CartHarness />
      </CartCtxProvider>
    );

    await user.click(screen.getByRole("button", { name: /submit order/i }));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(
      await screen.findByText(/order submitted successfully/i)
    ).toBeInTheDocument();
  });

  test("shows error message when submission fails", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.mocked(fetch);

    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    render(
      <CartCtxProvider>
        <CartHarness />
      </CartCtxProvider>
    );

    await user.click(screen.getByRole("button", { name: /submit order/i }));

    expect(
      await screen.findByText(/http error: status 500/i)
    ).toBeInTheDocument();
  });
});
