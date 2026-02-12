import { render, screen } from "@testing-library/react";

import MotionContainer from "../../../components/ui/MotionContainer";

describe("MotionContainer", () => {
  test("renders children", () => {
    render(
      <MotionContainer>
        <div>content</div>
      </MotionContainer>
    );

    expect(screen.getByText("content")).toBeInTheDocument();
  });
});
