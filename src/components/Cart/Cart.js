import React from "react";
import { createPortal } from "react-dom";

//Component Imports
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useCart } from "./CartContext/CartCtxProvider";
import Button from "../UI/Button";

import { FIREBASE_ENDPOINT } from "../../App";

const Cart = () => {
  const crtCtx = useCart();

  const [error, setError] = React.useState(null);
  const dbUrl = React.useRef(FIREBASE_ENDPOINT + "Orders.json");

  const submitOrderHandler = () => {
    const submitOrder = async () => {
      try {
        const response = await fetch(dbUrl.current, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crtCtx.items),
        });

        if (!response.status) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    submitOrder();
    crtCtx.clearCart();
    crtCtx.toggleCart();
  };

  const clearCartHandler = () => {
    crtCtx.clearCart();
    crtCtx.toggleCart();
  };

  if (error) console.log(error);

  let cartContent;
  if (crtCtx.items.length === 0) {
    cartContent = (
      <div className={classes["empty-cart"]}>
        <h3>Cart is empty</h3>
        <span className="material-icons md-114" aria-hidden="true">
          sentiment_dissatisfied
        </span>
      </div>
    );
  } else {
    cartContent = (
      <React.Fragment>
        <div className={classes["cart-header"]}>
          <h2>{`Cart Total: $${crtCtx.totalAmount.toFixed(2)}`}</h2>
          <div>
            <Button
              className={classes["clear-cart-button"]}
              onClick={clearCartHandler}
              label="Clear Cart"
            />
            <Button
              className={classes["submit-order-button"]}
              onClick={submitOrderHandler}
              label={"Submit Order"}
            />
          </div>
        </div>

        <div className={classes["cart-items"]}>
          <ul>
            {crtCtx.items.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  itemAmountInCart={item.amount}
                  onUpdateCartItem={crtCtx.updateCart}
                />
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }

  return createPortal(
    <div className={classes["modal-wrapper"]}>
      <div
        className={classes["modal-background"]}
        onClick={crtCtx.toggleCart}
      />
      <Modal className={classes["cart-modal"]}>{cartContent}</Modal>
    </div>,
    document.getElementById("modal")
  );
};

export default Cart;
