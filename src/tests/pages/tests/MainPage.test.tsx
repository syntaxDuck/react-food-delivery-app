import { render, screen } from "../../test-utils";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import Layout from "../../../components/layout/Layout";
import HomePage from "../../../pages/HomePage";

beforeAll(() => {
  const modal = document.createElement('div');
  modal.setAttribute('id', 'modal');
  document.body.appendChild(modal);
});

afterAll(() => {
  const modal = document.getElementById("modal");
  if (modal?.parentNode) {
    modal.parentNode.removeChild(modal);
  }
});

beforeEach(() => {
  render(
    <BrowserRouter>
      <Layout isLoggedIn={false}>
        <HomePage />
      </Layout>
    </BrowserRouter>,
    { includeAuth: true }
  );
});

test("Verify: Home Page Default State", async () => {
  const user = userEvent.setup();

  expect(
    screen.getByRole("heading", { name: /welcome to chrono delivery/i })
  ).toBeDefined();
  expect(screen.getByRole("img", { name: /drone/i })).toBeDefined();

  expect(screen.getByRole("button", { name: /add to cart/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /clear/i })).toBeDefined();
  expect(screen.getByRole("heading", { name: /delicious menu/i })).toBeDefined();

  expect(
    screen.getByRole("heading", { name: /find us in austin, tx/i })
  ).toBeDefined();

  expect(screen.queryByRole("heading", { name: /cart is empty/i })).toBeNull();

  await user.click(screen.getByRole("button", { name: /view shopping cart/i }));
  expect(await screen.findByRole("heading", { name: /cart is empty/i })).toBeDefined();
});
