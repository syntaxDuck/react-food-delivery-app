import userEvent from "@testing-library/user-event";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { vi } from "vitest";

import LoginPage from "../../../pages/LoginPage";
import { render, screen, waitFor } from "../../test-utils";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual<typeof import("firebase/auth")>("firebase/auth");
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn().mockResolvedValue({ user: { email: "user@test.com" } }),
    createUserWithEmailAndPassword: vi.fn().mockResolvedValue({ user: { email: "user@test.com" } }),
    onAuthStateChanged: vi.fn((_auth, callback) => {
      callback(null);
      return vi.fn();
    }),
  };
});

const renderLoginPage = () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>,
    { includeAuth: true }
  );
};

test("Verify: Login Page Component Default State", () => {
  renderLoginPage();
  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/password/i, { selector: 'input' }));
  expect(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: /sign up/i }));
});

test("Verify: Switch From Login to Sign Up Functionality", async () => {
  renderLoginPage();
  const user = userEvent.setup();

  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/password/i, { selector: 'input' }));
  expect(screen.getByRole("button", { name: /login/i }));
  expect(screen.getByRole("button", { name: /sign up/i }));

  await user.click(screen.getByText(/sign up/i));
  
  await screen.findByRole("button", { name: /sign in/i });

  expect(screen.getByRole("textbox", { name: /email address/i }));
  expect(screen.getByLabelText(/^password/i, { selector: 'input' }));
  expect(screen.getByPlaceholderText(/confirm password/i));
  expect(screen.getByRole("button", { name: /sign in/i }));

  expect(
    screen.queryByRole("button", { name: /sign up/i })
  ).not.toBeInTheDocument();
});

test("Submits login form and navigates on success", async () => {
  const user = userEvent.setup();

  renderLoginPage();

  await user.type(screen.getByLabelText(/email address/i), "user@test.com");
  await user.type(screen.getByLabelText(/password/i, { selector: 'input' }), "Passw0rd!");
  await user.click(screen.getByRole("button", { name: /login/i }));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/index");
  });
});
