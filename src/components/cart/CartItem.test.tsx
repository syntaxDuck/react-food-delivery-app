import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import CartItem from "./CartItem";
import type { CartItemType } from "./CartTypes";

const item: CartItemType = {
  id: "item-1",
  name: "Sushi",
  price: 5,
  amount: 2,
};

describe("CartItem", () => {
  test("renders item details and handles actions", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onUpdateAmount = vi.fn();

    render(
      <CartItem item={item} onRemove={onRemove} onUpdateAmount={onUpdateAmount} />
    );

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("$10.00")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /delete/i }));
    expect(onRemove).toHaveBeenCalledWith("item-1");

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onUpdateAmount).toHaveBeenCalledWith({ ...item, amount: 3 });
  });
});
