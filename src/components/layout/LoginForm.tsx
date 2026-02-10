import React from "react";
import { motion } from "framer-motion";

//Component imports
import AnimatedCard from "../ui/AnimatedCard";
import AnimatedButton from "../ui/AnimatedButton";

//Styles imports

const formVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const inputVariants = {
  focus: {
    scale: 1.02,
    borderColor: "#d66e6e",
    boxShadow: "0 0 0 3px rgba(214, 110, 110, 0.3)"
  }
};

const LoginForm = (props) => {
  const [usernameValid, setUsernameValid] = React.useState(true);
  const [passwordValid, setPasswordValid] = React.useState(true);
  const [confPasswordValid, setConfPasswordValid] = React.useState(true);

  React.useEffect(() => {
    if (props.usernameInputRef.current?.value === "") setUsernameValid(true);
    if (props.passwordInputRef.current?.value === "") setPasswordValid(true);
    try {
      if (props.confPasswordInputRef.current?.value === "")
        setConfPasswordValid(true);
    } catch { }
  }, [
    props.userAction,
    props.usernameInputRef,
    props.passwordInputRef,
    props.confPasswordInputRef,
  ]);

  const checkUsername = (username) => {
    const acceptableDomains = [".com", ".org", ".net"];
    const properDomain = acceptableDomains.some((domain) => {
      return username.endsWith(domain);
    });
    if (properDomain && username.includes("@")) {
      console.log("Username verified");
      setUsernameValid(true);
      return true;
    }
    setUsernameValid(false);
    return false;
  };

  const checkPassword = (password) => {
    const specialCharacters = [
      "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=",
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

  const checkConfirmPassword = (password, confirmPassword) => {
    if (props.userAction === "SignUp") {
      return password === confirmPassword;
    }
    return true;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const username = props.usernameInputRef.current.value;
    const password = props.passwordInputRef.current;
    let confirmPassword = "";

    try {
      confirmPassword = props.confPasswordInputRef.current.value;
    } catch { }

    const usernameChecked = checkUsername(username);
    const passwordChecked = checkPassword(password);
    const passwordsMatch = checkConfirmPassword(password, confirmPassword);

    if (usernameChecked && passwordChecked && passwordsMatch) {
      props.onFormSubmit();
    }
  };

  const getInputClasses = (isValid) => `
    w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray
    transition-all duration-200
    ${isValid
      ? 'border-white/30 focus:ring-primary focus:border-primary'
      : 'border-red-400 focus:ring-red-400 focus:border-red-400'
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
          className="text-3xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {props.userAction === "SignIn" ? "Welcome Back" : "Create Account"}
        </motion.h1>

        <form onSubmit={formSubmitHandler} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-white font-medium mb-2">
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
            />
            {!usernameValid && (
              <motion.p
                className="text-red-400 text-sm mt-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Please enter a valid email address
              </motion.p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-white font-medium mb-2">
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
            />
            {!passwordValid && (
              <motion.p
                className="text-red-400 text-sm mt-2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Password must be                 &gt;6 chars with special character
              </motion.p>
            )}
          </div>

          {props.userAction === "SignUp" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="confPassword" className="block text-white font-medium mb-2">
                Confirm Password
              </label>
              <motion.input
                id="confPassword"
                className={getInputClasses(confPasswordValid)}
                type="password"
                ref={props.confPasswordInputRef}
                placeholder="Confirm your password"
                variants={inputVariants}
                whileFocus="focus"
              />
              {!confPasswordValid && (
                <motion.p
                  className="text-red-400 text-sm mt-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Passwords do not match
                </motion.p>
              )}
            </motion.div>
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
            <p className="text-white/70">
              Don't have an account?{" "}
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={() => props.onChangeUserAction("SignUp")}
                className="ml-2"
              >
                Sign Up
              </AnimatedButton>
            </p>
          ) : (
            <p className="text-white/70">
              Already have an account?{" "}
              <AnimatedButton
                variant="outline"
                size="sm"
                onClick={() => props.onChangeUserAction("SignIn")}
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
