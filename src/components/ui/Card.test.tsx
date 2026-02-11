import { render, screen } from "@testing-library/react";

import Card from "./Card";

describe("Card", () => {
  test("renders children", () => {
    render(
      <Card>
        <div>card body</div>
      </Card>
    );

    expect(screen.getByText("card body")).toBeInTheDocument();
  });
});
