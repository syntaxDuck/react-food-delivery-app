import { render, screen } from "@testing-library/react";

import AnimatedCard from "../../../components/ui/AnimatedCard";

describe("AnimatedCard", () => {
  test("renders children", () => {
    render(
      <AnimatedCard>
        <div>card content</div>
      </AnimatedCard>
    );

    expect(screen.getByText("card content")).toBeInTheDocument();
  });
});
