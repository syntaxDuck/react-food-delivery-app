import React from "react";
import classes from "./CartButton.module.css";

const CartButton = ({ onCartStateChange }) => {
  return (
    <React.Fragment>
      <button
        onClick={onCartStateChange}
        className={classes["cart-button"]}
        aria-label="View shopping cart"
      >
        <p className="material-icons md-36">shopping_cart</p>
      </button>
    </React.Fragment>
  );
};

export default CartButton;
