import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { useEffect } from "react";
import { vi } from "vitest";

import { useCart } from "../../../components/cart/cart-context/CartContext";
import CartCtxProvider from "../../../components/cart/cart-context/CartCtxProvider";
import CartButton from "../../../components/cart/CartButton";
import type { CartItemType } from "../../../components/cart/CartTypes";

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  motion: {
    button: React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
      ({ children, ...props }, ref) => (
        <button ref={ref} {...props}>
          {children}
        </button>
      )
    ),
    span: React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
      ({ children, ...props }, ref) => (
        <span ref={ref} {...props}>
          {children}
        </span>
      )
    ),
    div: React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
      ({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
          {children}
        </div>
      )
    ),
  },
}));

const CartButtonHarness = ({
  items,
  onCartStateChange,
}: {
  items: CartItemType[];
  onCartStateChange: () => void;
}) => {
  const { updateCart } = useCart();

  useEffect(() => {
    updateCart(items);
  }, [items, updateCart]);

  return <CartButton onCartStateChange={onCartStateChange} />;
};

const CartToggleHarness = () => {
  const { state, toggleCart } = useCart();

  return (
    <div>
      <div data-testid="cart-active">{state.cartActive ? "active" : "inactive"}</div>
      <CartButton onCartStateChange={toggleCart} />
    </div>
  );
};

describe("CartButton", () => {
  test("renders badge with item count and handles click", async () => {
    const user = userEvent.setup();
    const onCartStateChange = vi.fn();

    render(
      <CartCtxProvider>
        <CartButtonHarness
          onCartStateChange={onCartStateChange}
          items={[
            { id: "1", name: "Roll", price: 5, amount: 2 },
            { id: "2", name: "Ramen", price: 8, amount: 1 },
          ]}
        />
      </CartCtxProvider>
    );

    expect(screen.getByText("3")).toBeDefined();
    await user.click(screen.getByRole("button", { name: /view shopping cart/i }));
    expect(onCartStateChange).toHaveBeenCalledTimes(1);
  });

  test("opens cart when clicked with provider toggle handler", async () => {
    const user = userEvent.setup();

    render(
      <CartCtxProvider>
        <CartToggleHarness />
      </CartCtxProvider>
    );

    expect(screen.getByTestId("cart-active").textContent).toBe("inactive");
    await user.click(screen.getByRole("button", { name: /view shopping cart/i }));
    expect(screen.getByTestId("cart-active").textContent).toBe("active");
  });
});
