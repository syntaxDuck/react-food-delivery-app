import React from "react";
import classes from "./Button.module.css";

const button = ({ href, className, onClick, disabled, label }) => {
  const buttonClasses = `${className || classes["button-default"]}`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      <a className={classes.anchor} href={href}>
        <p href={href}>{label || "button"}</p>
      </a>
    </button>
  );
};

export default button;
