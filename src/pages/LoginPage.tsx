import React, { useRef, useState } from "react";

//Component imports
import LoginForm from "../components/layout/LoginForm";

//Function imports
import { useNavigate } from "react-router";
import { API_KEY } from "../private/PRIVATE";

const API_URLS = {
  SignUp: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
  SignIn: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
};

const LoginPage = (props: any) => {
  const [userAction, setUserAction] = useState("SignIn");
  let navigate = useNavigate();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confPasswordRef = useRef(null);

  document.body.style.overflow = "hidden";

  const [error, setError] = React.useState(null);

  const userActionHandler = async (event: any) => {

    if (userAction === "SignUp") {
      if (passwordRef.current.value !== confPasswordRef.current.value) {
        return;
      }
    }

    let response_data;
    const sendRequest = async () => {
      const apiURL = API_URLS[userAction];

      const requestBody = {
        email: usernameRef.current.value,
        password: passwordRef.current.value,
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

        if (!response.status) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        response_data = await response.json();

        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    await sendRequest();
    if (error === null) {
      props.onLoginChange(response_data.email.split("@")[0]);
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
