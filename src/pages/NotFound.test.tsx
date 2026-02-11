import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import NotFound from "./NotFound";

describe("NotFound", () => {
  test("renders not found message", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
    expect(screen.getByText(/404: page not found/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /back to home/i })).toBeInTheDocument();
  });
});
