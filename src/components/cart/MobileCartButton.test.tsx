import { render, screen } from "@testing-library/react";
import { act } from "react";
import { vi } from "vitest";

import MobileCartButton from "./MobileCartButton";

describe("MobileCartButton", () => {
  test("shows label after animation completes", async () => {
    const onClick = vi.fn();

    vi.useFakeTimers();
    render(<MobileCartButton onClick={onClick} animate />);
    expect(screen.queryByText(/cart/i)).not.toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(400);
    });

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    vi.useRealTimers();
  });

  test("hides label when animation is not active", () => {
    const onClick = vi.fn();

    render(<MobileCartButton onClick={onClick} animate={false} />);
    expect(screen.queryByText(/cart/i)).not.toBeInTheDocument();
  });
});
