import React from "react";
import classes from "./Button.module.css";

const Button = ({ href, className, onClick, disabled, label, type }) => {
  const buttonClasses = `${className || classes["button-default"]}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses} onClick={onClick}>
        <p>{label || "button"}</p>
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
    >
      <p>{label || "button"}</p>
    </button>
  );
};

export default Button;
