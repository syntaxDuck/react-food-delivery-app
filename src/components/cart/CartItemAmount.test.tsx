import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import CartItemAmount from "./CartItemAmount";

describe("CartItemAmount", () => {
  test("calls increase and decrease handlers", async () => {
    const user = userEvent.setup();
    const onIncrease = vi.fn();
    const onDecrease = vi.fn();

    render(
      <CartItemAmount
        amountInCart={2}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    );

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));

    expect(onIncrease).toHaveBeenCalledTimes(1);
    expect(onDecrease).toHaveBeenCalledTimes(1);
  });
});
