import {
  render,
  screen,
  fireEvent,
} from "@testing-library/react";
import { BrowserRouter } from "react-router";
import NavigationBar from "../navigation_bar/NavigationBar.tsx";
import CartCtxProvider from "../../cart/cart_context/CartCtxProvider";

// Mock window.innerWidth for responsive testing
const mockInnerWidth = jest.fn();
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: mockInnerWidth,
});

describe("NavigationBar Responsive Behavior", () => {
  beforeEach(() => {
    // Reset window width before each test
    mockInnerWidth.mockReset();
  });

  test("Renders desktop navigation on screens >= 728px", () => {
    mockInnerWidth.mockReturnValue(1024);
    
    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar loginStatus={false} />
        </CartCtxProvider>
      </BrowserRouter>
    );

    // Check that desktop navigation elements are present
    expect(screen.getByText("menu")).toBeInTheDocument();
    expect(screen.getByText("location")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    
    // Check that mobile menu button is hidden
    const mobileMenuButton = screen.queryByRole("button", { name: /menu/i });
    expect(mobileMenuButton).not.toBeInTheDocument();
  });

  test("Renders mobile navigation on screens < 728px", () => {
    mockInnerWidth.mockReturnValue(375);
    
    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar loginStatus={false} />
        </CartCtxProvider>
      </BrowserRouter>
    );

    // Check that mobile menu button is present
    const mobileMenuButton = screen.getByRole("button", { name: /menu/i });
    expect(mobileMenuButton).toBeInTheDocument();
    
    // Check that desktop navigation items are hidden
    expect(screen.queryByText("menu")).not.toBeInTheDocument();
    expect(screen.queryByText("location")).not.toBeInTheDocument();
    expect(screen.queryByText("About Us")).not.toBeInTheDocument();
  });

  test("Logo navigates to home when clicked", () => {
    mockInnerWidth.mockReturnValue(1024);
    
    render(
      <BrowserRouter>
        <CartCtxProvider>
          <NavigationBar loginStatus={false} />
        </CartCtxProvider>
      </BrowserRouter>
    );

    const logo = screen.getByText("chrono delivery");
    expect(logo.closest("a")).toHaveAttribute("href", "/index");
  });

  test("Mobile menu opens and closes correctly", () => {
    mockInnerWidth.mockReturnValue(375);
    
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
    fireEvent.click(mobileMenuButton);
    
    // Mobile menu should now be open
    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.getByText("menu")).toBeInTheDocument();
    expect(screen.getByText("location")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    
    // Click close button to close menu
    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);
    
    // Mobile menu should be closed again
    expect(screen.queryByText("Menu")).not.toBeInTheDocument();
  });
});
