import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AnimatedModal from "./AnimatedModal";

describe("AnimatedModal", () => {
  test("renders content when open and closes on backdrop click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { container } = render(
      <AnimatedModal isOpen={true} onClose={onClose}>
        <div>Modal content</div>
      </AnimatedModal>
    );

    expect(screen.getByText(/modal content/i)).toBeInTheDocument();

    const backdrop = container.firstElementChild as HTMLElement | null;
    if (!backdrop) throw new Error("Backdrop not found");

    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
