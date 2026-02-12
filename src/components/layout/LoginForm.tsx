import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";

//Styles imports
import type { LoginFormProps, ValidationResult } from "../../types/auth";
import AnimatedButton from "../ui/AnimatedButton";
//Component imports
import AnimatedCard from "../ui/AnimatedCard";

const formVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const inputVariants: Variants = {
  focus: {
    scale: 1.02,
    borderColor: "var(--primary)",
    boxShadow: "0 0 0 3px color-mix(in oklab, var(--primary) 30%, transparent)"
  }
};

const LoginForm = (props: LoginFormProps) => {
  const [usernameValid, setUsernameValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [confPasswordValid, setConfPasswordValid] = React.useState(true);

  React.useEffect(() => {
    if (props.usernameInputRef.current?.value === "") setUsernameValid(true);
    if (props.passwordInputRef.current?.value === "") setPasswordValid(true);
    if (props.confpasswordInputRef?.current?.value === "") {
      setConfPasswordValid(true);
    }
  }, [
    props.userAction,
    props.usernameInputRef,
    props.passwordInputRef,
    props.confpasswordInputRef,
  ]);

  const checkUsername = (username: string): ValidationResult => {
    const acceptableDomains = [".com", ".org", ".net"];
    const properDomain = acceptableDomains.some((domain) => {
      return username.endsWith(domain);
    });
    if (properDomain && username.includes("@")) {
      setUsernameValid(true);
      return { isValid: true, errors: [] };
    }
    setUsernameValid(false);
    return { isValid: false, errors: ["Invalid email format"] };
  };

  const checkPassword = (password: string): ValidationResult => {
    const specialCharacters = [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=",
    ];
    const includesSpecialCharacter = specialCharacters.some((char) => {
      return password.includes(char);
    });
    if (password.length > 6 && includesSpecialCharacter) {
      setPasswordValid(true);
      return { isValid: true, errors: [] };
    }
    setPasswordValid(false);
    return { isValid: false, errors: ["Password must be >6 chars with special character"] };
  };

  const checkConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
    if (props.userAction === "SignUp") {
      if (password === confirmPassword) {
        setConfPasswordValid(true);
        return { isValid: true, errors: [] };
      }
      setConfPasswordValid(false);
      return { isValid: false, errors: ["Passwords do not match"] };
    }
    return { isValid: true, errors: [] };
  };

  const formSubmitHandler = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const username = props.usernameInputRef.current?.value ?? "";
    const password = props.passwordInputRef.current?.value ?? "";
    const confirmPassword = props.confpasswordInputRef?.current?.value ?? "";

    const usernameChecked = checkUsername(username);
    const passwordChecked = checkPassword(password);
    const passwordsMatch = checkConfirmPassword(password, confirmPassword);

    if (usernameChecked.isValid && passwordChecked.isValid && passwordsMatch.isValid) {
      props.onFormSubmit(event);
    }
  };

  const getInputClasses = (isValid: boolean): string => `
    w-full px-4 py-3 bg-bg-light/30 border rounded-lg text-text placeholder:text-text/50
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray
    transition-all duration-200
    ${isValid
      ? 'border-border/60 focus:ring-primary focus:border-primary'
      : 'border-danger focus:ring-danger focus:border-danger'
    }
  `;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      variants={formVariants}
      initial="initial"
      animate="animate"
    >
      <AnimatedCard className="w-full max-w-md">
        <motion.h1
          className="text-3xl font-bold text-text text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {props.userAction === "SignIn" ? "Welcome Back" : "Create Account"}
        </motion.h1>

        {props.errorMessage && (
          <motion.div
            className="mb-6 rounded-lg border border-danger/70 bg-danger/15 px-4 py-3 text-sm text-danger"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            role="alert"
          >
            {props.errorMessage}
          </motion.div>
        )}

        <form onSubmit={formSubmitHandler} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-text font-medium mb-2">
              Email Address
            </label>
            <motion.input
              id="username"
              className={getInputClasses(usernameValid)}
              type="text"
              ref={props.usernameInputRef}
              placeholder="your@email.com"
              variants={inputVariants}
              whileFocus="focus"
              autoComplete="email"
              required
              aria-invalid={!usernameValid}
            />
            {!usernameValid && (
              <motion.p
                className="text-danger text-sm mt-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Please enter a valid email address
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-text font-medium mb-2">
              Password
            </label>
            <motion.input
              id="password"
              className={getInputClasses(passwordValid)}
              type="password"
              ref={props.passwordInputRef}
              placeholder="Enter your password"
              variants={inputVariants}
              whileFocus="focus"
              autoComplete={props.userAction === "SignIn" ? "current-password" : "new-password"}
              required
              aria-invalid={!passwordValid}
            />
            {!passwordValid && (
              <motion.p
                className="text-danger text-sm mt-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Password must be                 &gt;6 chars with special character
              </motion.p>
            )}
          </div>

          {props.userAction === "SignUp" && (
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-text font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                className={getInputClasses(confPasswordValid)}
                type="password"
                placeholder="Confirm password"
                ref={props.confpasswordInputRef}
                autoComplete="new-password"
                required
                aria-invalid={!confPasswordValid}
              />
            </div>
          )}

          <motion.div
            className="pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <AnimatedButton
              type="submit"
              variant="default"
              size="lg"
              className="w-full"
            >
              {props.userAction === "SignIn" ? "Login" : "Create Account"}
            </AnimatedButton>
          </motion.div>
        </form>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {props.userAction === "SignIn" ? (
            <p className="text-text/70">
              Don't have an account?{" "}
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={() => {
                  props.onChangeUserAction("SignUp");
                }}
                className="ml-2"
              >
                Sign Up
              </AnimatedButton>
            </p>
          ) : (
            <p className="text-text/70">
              Already have an account?{" "}
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={() => {
                  props.onChangeUserAction("SignIn");
                }}
                className="ml-2"
              >
                Sign In
              </AnimatedButton>
            </p>
          )}
        </motion.div>
      </AnimatedCard>
    </motion.div>
  );
};

export default React.memo(LoginForm);
