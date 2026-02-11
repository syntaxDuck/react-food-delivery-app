import { render, screen } from "@testing-library/react";

import MenuDisplay from "./MenuDisplay";
import type { MenuData } from "./types";

const sampleMenu: MenuData = {
  Sushi: {
    id: "s1",
    price: 12,
    description: "Fresh sushi",
  },
};

describe("MenuDisplay", () => {
  test("renders loading state", () => {
    render(
      <MenuDisplay
        menuItems={null}
        loading={true}
        error={null}
        itemAmountsMap={new Map()}
        addToPreCartHandler={() => undefined}
        updateCartHandler={() => undefined}
        clearPreCart={() => undefined}
      />
    );

    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
  });

  test("renders menu items", () => {
    render(
      <MenuDisplay
        menuItems={sampleMenu}
        loading={false}
        error={null}
        itemAmountsMap={new Map()}
        addToPreCartHandler={() => undefined}
        updateCartHandler={() => undefined}
        clearPreCart={() => undefined}
      />
    );

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("$12.00")).toBeInTheDocument();
  });

  test("renders error state", () => {
    render(
      <MenuDisplay
        menuItems={null}
        loading={false}
        error="Failed"
        itemAmountsMap={new Map()}
        addToPreCartHandler={() => undefined}
        updateCartHandler={() => undefined}
        clearPreCart={() => undefined}
      />
    );

    expect(screen.getByText(/unable to load menu/i)).toBeInTheDocument();
  });
});
