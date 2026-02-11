import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import CartCtxProvider from "../../cart/cart-context/CartCtxProvider";
import NavigationBar from "../navigation-bar/NavigationBar.tsx";

describe("NavigationBar", () => {
  test("Renders navigation items and logo link", () => {
    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar loginStatus={false} />
        </CartCtxProvider>
      </BrowserRouter>
    );

    expect(screen.getAllByText("menu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("location").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About Us").length).toBeGreaterThan(0);

    const logo = screen.getByText("chrono delivery");
    expect(logo.closest("a")).toHaveAttribute("href", "/index");
  });

  test("Mobile menu opens and closes correctly", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar loginStatus={false} />
        </CartCtxProvider>
      </BrowserRouter>
    );

    // Initially mobile menu should be closed
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();

    // Click mobile menu button to open
    const mobileMenuButtons = screen.getAllByRole("button", { name: /menu/i });
    await user.click(mobileMenuButtons[0]);
    
    // Mobile menu should now be open
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByText("menu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("location").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About Us").length).toBeGreaterThan(0);
    
    // Click close button to close menu
    const closeButtons = screen.getAllByRole("button", { name: /close/i });
    await user.click(closeButtons[0]);
    
    // Mobile menu should be closed again
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });
});
