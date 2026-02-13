import { render, screen, waitFor } from "../../../test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import NavigationBar from "../../../../components/layout/navigation-bar/NavigationBar.tsx";

describe("NavigationBar", () => {
  test("Renders navigation items and logo link", () => {
    render(
      <BrowserRouter>
        <NavigationBar
          loginStatus={false}
          isLightTheme={false}
          onToggleTheme={() => undefined}
        />
      </BrowserRouter>,
      { includeAuth: true, includeCart: true }
    );

    expect(screen.getAllByText("menu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("location").length).toBeGreaterThan(0);
    const aboutUsLabels = screen.getAllByText("About Us");
    expect(aboutUsLabels.length).toBeGreaterThan(0);
    expect(aboutUsLabels[0]).toHaveClass("whitespace-nowrap");
    expect(screen.getAllByRole("button", { name: /login/i }).length).toBeGreaterThan(0);

    const logo = screen.getByText("chrono delivery");
    expect(logo.closest("a")).toHaveAttribute("href", "/index");
  });

  test("Mobile menu opens and closes correctly", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <NavigationBar
          loginStatus={false}
          isLightTheme={false}
          onToggleTheme={() => undefined}
        />
      </BrowserRouter>,
      { includeAuth: true, includeCart: true }
    );

    expect(screen.queryByText("Menu")).not.toBeInTheDocument();

    const openButton = screen.getByRole("button", { name: /open menu/i });
    await user.click(openButton);
    
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getAllByText("menu").length).toBeGreaterThan(0);
    expect(screen.getAllByText("location").length).toBeGreaterThan(0);
    expect(screen.getAllByText("About Us").length).toBeGreaterThan(0);
    
    const closeButton = screen.getByRole("button", { name: /close menu/i });
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByText("Menu")).not.toBeInTheDocument();
    });
  });
});
