import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AnimatedButton from "./AnimatedButton";

describe("AnimatedButton", () => {
  test("renders label and handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <AnimatedButton variant="default" size="sm" onClick={onClick}>
        Click
      </AnimatedButton>
    );

    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
