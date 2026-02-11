import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, Navigate,Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import LoginPage from "../LoginPage";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderLoginPage = (onLoginChange: (username: string) => void) => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<LoginPage onLoginChange={onLoginChange} />} />
      </Routes>
    </BrowserRouter>
  );
};

test("Verify: Login Page Component Default State", () => {
  renderLoginPage(vi.fn());
  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/password/i));
  expect(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: /sign up/i }));
});

test("Verify: Switch From Login to Sign Up Functionality", async () => {
  renderLoginPage(vi.fn());
  const user = userEvent.setup();

  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/password/i));
  expect(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: /sign up/i }));

  await user.click(screen.getByText(/sign up/i));
  
  // Wait for the UI to update
  await screen.findByRole("button", { name: /sign in/i });

  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/^password/i));
  expect(screen.getByPlaceholderText(/confirm password/i));
  expect(screen.getByRole("button", { name: /sign in/i }));

  expect(
    screen.queryByRole("button", { name: /sign up/i })
  ).not.toBeInTheDocument();
});

test("Submits login form and navigates on success", async () => {
  const user = userEvent.setup();
  const onLoginChange = vi.fn();

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ email: "user@test.com" }),
    })
  );

  renderLoginPage(onLoginChange);

  await user.type(screen.getByLabelText(/email address/i), "user@test.com");
  await user.type(screen.getByLabelText(/password/i), "passw0rd!");
  await user.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(onLoginChange).toHaveBeenCalledWith("user");
    expect(mockNavigate).toHaveBeenCalledWith("/index");
  });
});
