import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { vi } from "vitest";

import CartCtxProvider, { useCart } from "./cart-context/CartCtxProvider";
import CartButton from "./CartButton";
import type { CartItemType } from "./CartTypes";

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

    expect(screen.getByText("3")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /view shopping cart/i }));
    expect(onCartStateChange).toHaveBeenCalledTimes(1);
  });
});
