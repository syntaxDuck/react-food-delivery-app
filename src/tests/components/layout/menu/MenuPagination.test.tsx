import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import MenuPagination from "../../../../components/layout/menu/MenuPagination";

describe("MenuPagination", () => {
  test("renders page buttons and handles navigation", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <MenuPagination
        currentPage={2}
        totalPages={4}
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByRole("button", { name: /go to previous page/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: /go to next page/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: /go to page 4/i }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
