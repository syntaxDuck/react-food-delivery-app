import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Button from "./Button";

describe("Button", () => {
  test("renders as button by default and handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button label="Click me" onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: /click me/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("renders as link when href provided", () => {
    render(<Button label="Go" href="/path" />);
    const link = screen.getByRole("link", { name: /go/i });
    expect(link).toHaveAttribute("href", "/path");
  });
});
