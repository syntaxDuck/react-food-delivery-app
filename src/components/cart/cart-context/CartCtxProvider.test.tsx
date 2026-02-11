import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CartCtxProvider, { useCart } from "./CartCtxProvider";

const TestConsumer = () => {
  const { state, updateCart, clearCart, toggleCart } = useCart();

  return (
    <div>
      <div data-testid="cart-active">{state.cartActive ? "active" : "inactive"}</div>
      <div data-testid="total-amount">{state.totalAmount}</div>
      <div data-testid="item-count">{state.items.length}</div>
      <button
        type="button"
        onClick={() =>
          updateCart([{ id: "1", name: "Roll", price: 5, amount: 2 }])
        }
      >
        update
      </button>
      <button type="button" onClick={clearCart}>
        clear
      </button>
      <button type="button" onClick={toggleCart}>
        toggle
      </button>
    </div>
  );
};

describe("CartCtxProvider", () => {
  test("updates, clears, and toggles cart state", async () => {
    const user = userEvent.setup();

    render(
      <CartCtxProvider>
        <TestConsumer />
      </CartCtxProvider>
    );

    expect(screen.getByTestId("item-count").textContent).toBe("0");
    expect(screen.getByTestId("total-amount").textContent).toBe("0");
    expect(screen.getByTestId("cart-active").textContent).toBe("inactive");

    await user.click(screen.getByRole("button", { name: /update/i }));
    expect(screen.getByTestId("item-count").textContent).toBe("1");
    expect(screen.getByTestId("total-amount").textContent).toBe("10");

    await user.click(screen.getByRole("button", { name: /toggle/i }));
    expect(screen.getByTestId("cart-active").textContent).toBe("active");

    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(screen.getByTestId("item-count").textContent).toBe("0");
    expect(screen.getByTestId("total-amount").textContent).toBe("0");
  });
});
