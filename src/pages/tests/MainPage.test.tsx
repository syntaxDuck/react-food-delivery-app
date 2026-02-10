import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { act } from "react";
import Layout from "../../components/layout/Layout";
import MainPage from "../MainPage";
import CartCtxProvider from "../../components/cart/cart_context/CartCtxProvider";

// Create a div with id="modal" for createPortal
beforeAll(() => {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  document.body.appendChild(modal);
});

afterAll(() => {
  document.body.removeChild(document.getElementById('modal'));
});

beforeEach(() => {
  render(
    <BrowserRouter>
      <CartCtxProvider>
        <Layout loginStatus={false}>
          <MainPage />
        </Layout>
      </CartCtxProvider>
    </BrowserRouter>
  );
});

test("Verify: Main Page Default State", async () => {
  //verify about us component is rendered
  expect(
    screen.getByRole("heading", { name: /welcome to chrono delivery/i })
  ).toBeDefined();
  expect(screen.getByRole("img", { name: /drone/i })).toBeDefined();

  //verify menu component is rendered
  expect(screen.getByRole("button", { name: /add to cart/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /clear/i })).toBeDefined();
  expect(screen.getByRole("heading", { name: /delicious menu/i })).toBeDefined();

  //verify location component is rendered
  expect(
    screen.getByRole("heading", { name: /find us in austin, tx/i })
  ).toBeDefined();

  //verify cart is not displayed
  expect(screen.queryByRole("heading", { name: /cart is empty/i })).toBeNull();

  //verify cart is empty
  userEvent.click(screen.getByRole("button", { name: /view shopping cart/i }));
  expect(await screen.findByRole("heading", { name: /cart is empty/i })).toBeDefined();
});
