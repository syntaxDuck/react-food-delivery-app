import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { vi } from "vitest";

import type { UserAction } from "../../types/auth";
import LoginForm from "./LoginForm";

const LoginFormHarness = ({ onSubmit }: { onSubmit: () => void }) => {
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
    />
  );
};

describe("LoginForm", () => {
  test("validates inputs before submitting", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<LoginFormHarness onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email address/i), "invalid-email");
    await user.type(screen.getByLabelText(/password/i), "short");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test("switches to sign up mode", async () => {
    const user = userEvent.setup();
    render(<LoginFormHarness onSubmit={() => undefined} />);

    await user.click(screen.getByRole("button", { name: /sign up/i }));
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });
});
