import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import CartCtxProvider from "../../../../components/cart/cart-context/CartCtxProvider";
import NavigationBar from "../../../../components/layout/navigation-bar/NavigationBar.tsx";

describe("NavigationBar", () => {
  test("Renders navigation items and logo link", () => {
    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar
            loginStatus={false}
            isLightTheme={false}
            onToggleTheme={() => undefined}
          />
        </CartCtxProvider>
      </BrowserRouter>
    );

    expect(screen.getAllByText("menu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("location").length).toBeGreaterThan(0);
    const aboutUsLabels = screen.getAllByText("About Us");
    expect(aboutUsLabels.length).toBeGreaterThan(0);
    expect(aboutUsLabels[0]).toHaveClass("whitespace-nowrap");
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    const logo = screen.getByText("chrono delivery");
    expect(logo.closest("a")).toHaveAttribute("href", "/index");
  });

  test("Mobile menu opens and closes correctly", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar
            loginStatus={false}
            isLightTheme={false}
            onToggleTheme={() => undefined}
          />
        </CartCtxProvider>
      </BrowserRouter>
    );

    // Initially mobile menu should be closed
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();

    // Click slide handle to open
    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);
    
    // Mobile menu should now be open
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByText("menu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("location").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About Us").length).toBeGreaterThan(0);
    
    // Click close button to close menu
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeButton);
    
    // Mobile menu should be closed again
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });
});
