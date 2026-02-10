import React from "react";

//Component imports
import Card from "../UI/Card";
import Button from "../UI/Button";

//Styles imports
import classes from "./LoginForm.module.css";

const LoginForm = (props) => {
  const [usernameValid, setUsernameValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [confPasswordValid, setConfPasswordValid] = React.useState(true);


  React.useEffect(() => {
    if (props.usernameInputRef.current.value === "") setUsernameValid(true);
    if (props.passwordInputRef.current.value === "") setPasswordValid(true);
    try {
      if (props.confPasswordInputRef.current.value === "")
        setConfPasswordValid(true);
    } catch {}
  }, [
    props.userAction,
    props.usernameInputRef,
    props.passwordInputRef,
    props.confPasswordInputRef,
  ]);

  const checkUsername = (username) => {
    const acceptableDomains = [".com", ".org", ".net"];
    const properDoamin = acceptableDomains.some((domain) => {
      return username.endsWith(domain);
    });
    if (properDoamin && username.includes("@")) {
      console.log("Username verified");
      setUsernameValid(true);
      return true;
    }
    setUsernameValid(false);
    return false;
  };

  const checkPassword = (password) => {
    const specialCharacters = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "+",
      "=",
    ];
    const includesSpecialCharacter = specialCharacters.some((char) => {
      return password.includes(char);
    });
    if (password.length > 6 && includesSpecialCharacter) {
      setPasswordValid(true);
      return true;
    }
    setPasswordValid(false);
    return false;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const usernameChecked = checkUsername(props.usernameInputRef.current.value);
    const passwordChecked = checkPassword(props.passwordInputRef.current.value);

    if (usernameChecked && passwordChecked) {
      // props.onFormSubmit();
    }
  };
  return (
    <div className={classes["login-content"]}>
      <Card className={classes["login-card"]}>
        <h1>{props.userAction === "SignIn" ? "Login" : "New User"}</h1>
        <form onSubmit={formSubmitHandler} className={classes["login-form"]}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className={
                !usernameValid
                  ? classes["login-input-error"]
                  : classes["login-input"]
              }
              type="text"
              ref={props.usernameInputRef}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              className={
                !passwordValid
                  ? classes["login-input-error"]
                  : classes["login-input"]
              }
              type="password"
              ref={props.passwordInputRef}
            />
            {props.userAction === "SignUp" && (
              <React.Fragment>
                <label htmlFor="confPassword">Confirm Password</label>
                <input
                  id="confPassword"
                  className={
                    !confPasswordValid
                      ? classes["login-input-error"]
                      : classes["login-input"]
                  }
                  type="password"
                  ref={props.confPasswordInputRef}
                />
              </React.Fragment>
            )}
            <Button
              className={classes["action-submit"]}
              label={props.userAction === "SignIn" ? "Login" : "Submit"}
            />
          </div>

        </form>
        <div className={classes["action-wrapper"]}>
          {props.userAction === "SignIn" && (
            <Button
              className={classes["user-action"]}
              onClick={() => props.onChangeUserAction("SignUp")}
              label={"Sign Up"}
            />
          )}
          {props.userAction === "SignUp" && (
            <Button
              className={classes["user-action"]}
              onClick={() => props.onChangeUserAction("SignIn")}
              label={"Sign In"}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
