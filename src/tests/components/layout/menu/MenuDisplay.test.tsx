import { render, screen } from "@testing-library/react";

import MenuDisplay from "../../../../components/layout/menu/MenuDisplay";
import type { MenuItemType } from "../../../../components/layout/menu/types";

const sampleMenu: MenuItemType[] = [
  {
    id: "s1",
    name: "Sushi",
    price: 12,
    description: "Fresh sushi",
    category: "sushi"
  }
];

describe("MenuDisplay", () => {
  test("renders loading state", () => {
    render(
      <MenuDisplay
        menuItems={[]}
        loading={true}
        error={null}
        itemAmountsMap={new Map()}
        addToPreCartHandler={() => undefined}
        updateCartHandler={() => undefined}
        clearPreCart={() => undefined}
        currentPage={1}
        totalPages={1}
        onPageChange={() => undefined}
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
        currentPage={1}
        totalPages={1}
        onPageChange={() => undefined}
      />
    );

    expect(screen.getByText("Sushi")).toBeInTheDocument();
    expect(screen.getByText("$12.00")).toBeInTheDocument();
  });

  test("renders error state", () => {
    render(
      <MenuDisplay
        menuItems={[]}
        loading={false}
        error="Failed"
        itemAmountsMap={new Map()}
        addToPreCartHandler={() => undefined}
        updateCartHandler={() => undefined}
        clearPreCart={() => undefined}
        currentPage={1}
        totalPages={1}
        onPageChange={() => undefined}
      />
    );

    expect(screen.getByText(/unable to load menu/i)).toBeInTheDocument();
  });
});
