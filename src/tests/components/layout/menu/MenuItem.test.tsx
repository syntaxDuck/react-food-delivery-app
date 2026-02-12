import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import MenuItem from "../../../../components/layout/menu/MenuItem";

const baseProps = {
  id: "item-1",
  name: "Dragon Roll",
  price: 12.99,
  description: "A classic roll with avocado and eel.",
  amount: 1,
  onAddToPreCart: vi.fn()
};

describe("MenuItem", () => {
  test("applies single-line truncation to name and description", () => {
    render(<MenuItem {...baseProps} />);

    const name = screen.getByText(baseProps.name);
    const description = screen.getByText(baseProps.description);

    expect(name).toHaveClass("truncate");
    expect(description).toHaveClass("truncate");
  });
});
