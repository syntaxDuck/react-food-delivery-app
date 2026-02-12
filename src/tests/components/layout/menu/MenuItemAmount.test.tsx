import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import MenuItemAmount from "../../../../components/layout/menu/MenuItemAmount";

describe("MenuItemAmount", () => {
  test("updates amount controls and triggers card-level add", async () => {
    const user = userEvent.setup();
    const onChangeAmount = vi.fn();
    const onAddToCart = vi.fn();

    const { rerender } = render(
      <MenuItemAmount
        amount={1}
        onChangeAmount={onChangeAmount}
        onAddToCart={onAddToCart}
      />
    );

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onChangeAmount).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(onChangeAmount).toHaveBeenCalledWith(0);

    rerender(
      <MenuItemAmount
        amount={0}
        onChangeAmount={onChangeAmount}
        onAddToCart={onAddToCart}
      />
    );
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(onAddToCart).toHaveBeenCalledWith(0);
    expect(onChangeAmount).toHaveBeenCalledTimes(2);
  });
});
