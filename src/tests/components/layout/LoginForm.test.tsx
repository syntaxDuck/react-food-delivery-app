import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { vi } from "vitest";

import LoginForm from "../../../components/layout/LoginForm";
import type { UserAction } from "../../../types/auth";

const LoginFormHarness = ({
  onSubmit,
  errorMessage
}: {
  onSubmit: () => void;
  errorMessage?: string | null;
}) => {
  const [action, setAction] = useState<UserAction>("SignIn");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);

  return (
    <LoginForm
      onFormSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
      onChangeUserAction={setAction}
      userAction={action}
      usernameInputRef={usernameRef}
      passwordInputRef={passwordRef}
      confpasswordInputRef={confirmRef}
      errorMessage={errorMessage}
    />
  );
};

describe("LoginForm", () => {
  test("validates inputs before submitting", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginFormHarness onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email address/i), "invalid-email");
    await user.type(screen.getByLabelText(/password/i, { selector: 'input' }), "short");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(await screen.findByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test("switches to sign up mode", async () => {
    const user = userEvent.setup();
    render(<LoginFormHarness onSubmit={() => undefined} />);

    await user.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  test("renders error message when provided", () => {
    render(<LoginFormHarness onSubmit={() => undefined} errorMessage="Invalid credentials" />);
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  test("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<LoginFormHarness onSubmit={() => undefined} />);

    const passwordInput = screen.getByLabelText(/password/i, { selector: 'input' });
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByLabelText(/show password/i);
    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByLabelText(/hide password/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/hide password/i));
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
