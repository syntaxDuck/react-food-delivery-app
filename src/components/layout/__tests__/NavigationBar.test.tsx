import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "../navigation_bar/NavigationBar.tsx";
import CartCtxProvider from "../../cart/cart_context/CartCtxProvider";

describe("NavigationBar", () => {
  test("Renders navigation items and logo link", () => {
    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar loginStatus={false} />
        </CartCtxProvider>
      </BrowserRouter>
    );

    expect(screen.getByText("menu")).toBeInTheDocument();
    expect(screen.getByText("location")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();

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
    const mobileMenuButton = screen.getByRole("button", { name: /menu/i });
    await user.click(mobileMenuButton);
    
    // Mobile menu should now be open
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("menu")).toBeInTheDocument();
    expect(screen.getByText("location")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    
    // Click close button to close menu
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);
    
    // Mobile menu should be closed again
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });
});
