import { render, screen } from "@testing-library/react";

import LoadingSpinner from "../../../components/ui/LoadingSpinner";

describe("LoadingSpinner", () => {
  test("renders with accessible status", () => {
    render(<LoadingSpinner size="sm" color="white" />);
    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
  });
});
