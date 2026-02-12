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

    await user.click(screen.getByRole("button", { name: /prev/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: "4" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
