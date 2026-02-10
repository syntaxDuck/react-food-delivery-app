import React, { useRef, useState } from "react";

//Component imports
import LoginForm from "../components/layout/LoginForm";

//Function imports
import { useNavigate } from "react-router";
import { API_KEY } from "../private/PRIVATE";
import type { LoginPageProps, UserAction, AuthResponse } from "../types/auth";

const API_URLS: Record<UserAction, string> = {
  SignUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  SignIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
};

const LoginPage = ({ onLoginChange }: LoginPageProps) => {
  const [userAction, setUserAction] = useState("SignIn");
  let navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confPasswordRef = useRef<HTMLInputElement>(null);

  document.body.style.overflow = "hidden";

  const [error, setError] = React.useState<string | null>(null);

  const userActionHandler = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (userAction === "SignUp") {
      if (passwordRef.current?.value !== confPasswordRef.current?.value) {
        return;
      }
    }

    let response_data: AuthResponse | undefined;
    const sendRequest = async (): Promise<void> => {
      const apiURL = API_URLS[userAction as UserAction];

      const requestBody = {
        email: usernameRef.current?.value || "",
        password: passwordRef.current?.value || "",
        returnSecureToken: true,
      };

      try {
        const response = await fetch(apiURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        response_data = await response.json() as AuthResponse;

        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
      }
    };

    await sendRequest();
    if (error === null && response_data) {
      onLoginChange(response_data.email.split("@")[0]);
      navigate("/index");
    }
  };

  return (
    <React.Fragment>
      <LoginForm
        onFormSubmit={userActionHandler}
        onChangeUserAction={setUserAction}
        userAction={userAction}
        usernameInputRef={usernameRef}
        passwordInputRef={passwordRef}
        confpasswordInputRef={confPasswordRef}
      />
    </React.Fragment>
  );
};

export default LoginPage;
