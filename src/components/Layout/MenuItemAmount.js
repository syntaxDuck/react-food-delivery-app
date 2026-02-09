import React from "react";
import classes from "./MenuItemAmount.module.css";

const MenuItemAmount = ({ amount, onAddToPreCart }) => {

  const incrementCountHandler = () => {
    onAddToPreCart(amount + 1);
  };

  const decrementCountHandler = () => {
    onAddToPreCart(amount - 1);
  };

  return (
    <div className={classes["item-count"]}>
      <button
        type="button"
        onClick={incrementCountHandler}
        disabled={amount === 99}
        aria-label="Increase quantity"
      >
        +
      </button>
      <label>{amount}</label>
      <button
        type="button"
        onClick={decrementCountHandler}
        disabled={amount === 0}
        aria-label="Decrease quantity"
      >
        -
      </button>
    </div>
  );
};

export default React.memo(MenuItemAmount);
