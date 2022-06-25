import React from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useCart } from "./CartContext/CartCtxProvider";
import Button from "../UI/Button";

//import project specific variables
import { PROJECT_ID } from "../../private/PRIVATE";

const Cart = () => {
  const crtCtx = useCart();

  const [error, setError] = React.useState(null);
  const dbUrl = React.useRef("https://" + [PROJECT_ID] + ".firebaseio.com/");

  const submitOrderHandler = () => {
    const submitOrder = async () => {
      try {
        const response = await fetch(dbUrl.current + "Orders.json", {
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
        <span className="material-icons md-114">sentiment_dissatisfied</span>
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

  return (
    <div className={classes["modal-wrapper"]}>
      <div
        className={classes["modal-background"]}
        onClick={crtCtx.toggleCart}
      ></div>
      <Modal className={classes["cart-modal"]}>{cartContent}</Modal>
    </div>
  );
};

export default Cart;
