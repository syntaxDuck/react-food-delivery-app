import userEvent from "@testing-library/user-event";
import { useEffect } from "react";
import { vi } from "vitest";

import { render, screen } from "../../test-utils";

// Mock Firebase
vi.mock("../../../firebase/config", () => ({
  db: {},
  auth: { currentUser: { uid: 'test-user' } },
}));

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInAnonymously: vi.fn(() => Promise.resolve()),
  onAuthStateChanged: vi.fn(() => () => {}),
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  addDoc: vi.fn(() => Promise.resolve({ id: 'test-order-id' })),
  serverTimestamp: vi.fn(),
  getFirestore: vi.fn(),
}));

import Cart from "../../../components/cart/Cart";
import { useCart } from "../../../components/cart/cart-context/CartContext";
import type { CartItemType } from "../../../components/cart/CartTypes";

const item: CartItemType = {
  id: "item-1",
  name: "Sushi Roll",
  price: 12.5,
  amount: 1
};

const CartHarness = () => {
  const { updateCart, toggleCart } = useCart();

  useEffect(() => {
    updateCart([item]);
    toggleCart();
  }, [updateCart, toggleCart]);

  return <Cart />;
};

describe("Cart", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test("shows success message after submitting order", async () => {
    const user = userEvent.setup();
    
    render(
      <CartHarness />,
      { includeAuth: true, includeCart: true }
    );

    await user.click(screen.getByRole("button", { name: /submit order/i }));
    expect(
      await screen.findByText(/order submitted successfully/i)
    ).toBeInTheDocument();
  });

  test("shows error message when submission fails", async () => {
    const user = userEvent.setup();
    
    render(
      <CartHarness />,
      { includeAuth: true, includeCart: true }
    );

    await user.click(screen.getByRole("button", { name: /submit order/i }));

    expect(
      await screen.findByText(/http error/i)
    ).toBeInTheDocument();
  });

  test("removes item from cart when delete button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <CartHarness />,
      { includeAuth: true, includeCart: true }
    );

    // Initial check
    expect(screen.getByText(/sushi roll/i)).toBeInTheDocument();

    const deleteButton = screen.getByLabelText(/remove sushi roll from cart/i);
    await user.click(deleteButton);

    expect(screen.queryByText(/sushi roll/i)).not.toBeInTheDocument();
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });
});
