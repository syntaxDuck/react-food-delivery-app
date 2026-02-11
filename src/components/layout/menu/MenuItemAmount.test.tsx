import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import MenuItemAmount from "./MenuItemAmount";

describe("MenuItemAmount", () => {
  test("increments and decrements amount", async () => {
    const user = userEvent.setup();
    const onAddToPreCart = vi.fn();

    const { rerender } = render(
      <MenuItemAmount amount={1} onAddToPreCart={onAddToPreCart} />
    );

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onAddToPreCart).toHaveBeenCalledWith(2);

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(onAddToPreCart).toHaveBeenCalledWith(0);

    rerender(<MenuItemAmount amount={0} onAddToPreCart={onAddToPreCart} />);
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(onAddToPreCart).toHaveBeenCalledTimes(2);
  });
});
