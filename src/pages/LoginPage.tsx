import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import LoginForm from "../components/layout/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import type { UserAction } from "../types/auth";

const LoginPage = () => {
  const { signInWithEmail, signUpWithEmail, isAuthenticated } = useAuth();
  const [userAction, setUserAction] = useState<UserAction>("SignIn");
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confPasswordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      void navigate("/index");
    }
  }, [isAuthenticated, navigate]);

  const [error, setError] = useState<string | null>(null);

  const userActionHandler = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    event.preventDefault();

    if (userAction === "SignUp") {
      if (passwordRef.current?.value !== confPasswordRef.current?.value) {
        setError("Passwords do not match");
        return;
      }
    }

    const email = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError(null);
      if (userAction === "SignUp") {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      void navigate("/index");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
    }
  };

  return (
    <Fragment>
      <LoginForm
        onFormSubmit={(event) => {
          void userActionHandler(event);
        }}
        onChangeUserAction={setUserAction}
        userAction={userAction}
        usernameInputRef={usernameRef}
        passwordInputRef={passwordRef}
        confpasswordInputRef={confPasswordRef}
        errorMessage={error}
      />
    </Fragment>
  );
};

export default LoginPage;
