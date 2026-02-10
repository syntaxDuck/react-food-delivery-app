import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import LoginPage from "../LoginPage";

beforeEach(() => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<LoginPage onLoginChange={false} />} />
      </Routes>
    </BrowserRouter>
  );
});

test("Verify: Login Page Component Default State", () => {
  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/password/i));
  expect(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: /sign up/i }));
});

test("Verify: Switch From Login to Sign Up Functionality", async () => {
  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/password/i));
  expect(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: /sign up/i }));

  userEvent.click(screen.getByText(/sign up/i));
  
  // Wait for the UI to update
  await screen.findByRole("button", { name: /sign in/i });

  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/^password/i));
  expect(screen.getByLabelText(/^confirm password/i));
  expect(screen.getByRole("button", { name: /sign in/i }));

  expect(
    screen.queryByRole("button", { name: /sign up/i })
  ).not.toBeInTheDocument();
});
