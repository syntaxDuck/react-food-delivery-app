import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import MobileNavigation from "../../../../../components/layout/navigation-bar/mobile/MobileNavigation";
import { render, screen } from "../../../../test-utils";

describe("MobileNavigation", () => {
  test("toggles menu with slide handle", async () => {
    const user = userEvent.setup();
    const setActiveSection = vi.fn();

    render(
      <MobileNavigation
        activeSection="about-us"
        setActiveSection={setActiveSection}
        loginStatus={false}
        isLightTheme={false}
        onToggleTheme={() => undefined}
      />,
      { includeAuth: true, includeCart: true, includeRouter: true }
    );

    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);

    expect(await screen.findByText(/close menu/i)).toBeInTheDocument();
  });

  test("closes menu when cart button is clicked", async () => {
    const user = userEvent.setup();
    const setActiveSection = vi.fn();

    render(
      <MobileNavigation
        activeSection="about-us"
        setActiveSection={setActiveSection}
        loginStatus={false}
        isLightTheme={false}
        onToggleTheme={() => undefined}
      />,
      { includeAuth: true, includeCart: true, includeRouter: true }
    );

    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);

    const cartButton = await screen.findByText(/cart/i);
    await user.click(cartButton);

    expect(screen.queryByText(/close menu/i)).not.toBeInTheDocument();
  });
});
