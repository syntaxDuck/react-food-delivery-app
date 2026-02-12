import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import CartCtxProvider from "../../../../../components/cart/cart-context/CartCtxProvider";
import MobileNavigation from "../../../../../components/layout/navigation-bar/mobile/MobileNavigation";

describe("MobileNavigation", () => {
  test("toggles menu with slide handle", async () => {
    const user = userEvent.setup();
    const setMobileMenuOpen = vi.fn();

    const { rerender } = render(
      <CartCtxProvider>
        <MobileNavigation
          mobileMenuOpen={false}
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection="about-us"
          setActiveSection={() => undefined}
          loginStatus={false}
          isLightTheme={false}
          onToggleTheme={() => undefined}
        />
      </CartCtxProvider>
    );

    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);
    expect(setMobileMenuOpen).toHaveBeenCalledWith(true);

    rerender(
      <CartCtxProvider>
        <MobileNavigation
          mobileMenuOpen
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection="about-us"
          setActiveSection={() => undefined}
          loginStatus={false}
          isLightTheme={false}
          onToggleTheme={() => undefined}
        />
      </CartCtxProvider>
    );

    expect(await screen.findByText(/cart/i)).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeButton);
    expect(setMobileMenuOpen).toHaveBeenCalledWith(false);
  });

  test("closes menu when cart button is clicked", async () => {
    const user = userEvent.setup();
    const setMobileMenuOpen = vi.fn();

    render(
      <CartCtxProvider>
        <MobileNavigation
          mobileMenuOpen
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection="about-us"
          setActiveSection={() => undefined}
          loginStatus={false}
          isLightTheme={false}
          onToggleTheme={() => undefined}
        />
      </CartCtxProvider>
    );

    const cartButton = await screen.findByText(/cart/i);
    await user.click(cartButton);

    expect(setMobileMenuOpen).toHaveBeenCalledWith(false);
  });
});
