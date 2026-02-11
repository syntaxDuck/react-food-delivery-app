import { Fragment, useEffect, useRef, useState } from "react";
//Function imports
import { useNavigate } from "react-router";

//Component imports
import LoginForm from "../components/layout/LoginForm";
import { API_KEY } from "../private/PRIVATE";
import type { AuthResponse,LoginPageProps, UserAction } from "../types/auth";

const API_URLS: Record<UserAction, string> = {
  SignUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  SignIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
};

const LoginPage = ({ onLoginChange }: LoginPageProps) => {
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

  const [error, setError] = useState<string | null>(null);

  const userActionHandler = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (userAction === "SignUp") {
      if (passwordRef.current?.value !== confPasswordRef.current?.value) {
        return;
      }
    }

    let responseData: AuthResponse | undefined;
    const sendRequest = async (): Promise<AuthResponse | undefined> => {
      const apiURL = API_URLS[userAction];

      const requestBody = {
        email: usernameRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
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
            `This is an HTTP error: The status is ${String(response.status)}`
          );
        }

        responseData = await response.json() as AuthResponse;

        setError(null);
        return responseData;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        return undefined;
      }
    };

    const result = await sendRequest();
    if (result) {
      onLoginChange(result.email.split("@")[0]);
      void navigate("/index");
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
