import React from "react";
import classes from "./Card.module.css";

const Card = ({ className, children, id }) => {
  return (
    <div id={id} className={`${classes.card}  ${className}`}>
      {children}
    </div>
  );
};

export default Card;
