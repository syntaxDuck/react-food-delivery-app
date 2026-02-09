import React from "react";
import Card from "../UI/Card";
import MenuItem from "./MenuItem";
import classes from "./Menu.module.css";
import Button from "../UI/Button";

//Functional Imports
import { useCart } from "../Cart/CartContext/CartCtxProvider";
import useFetch from "../../functions/useFetch";

import { FIREBASE_ENDPOINT } from "../../App";

const Menu = () => {
  const updateCart = useCart().updateCart;
  const [preCart, setPreCart] = React.useState([]);

  const dbUrl = React.useRef(FIREBASE_ENDPOINT + "Menu.json");

  const { data, error, loading } = useFetch(dbUrl.current);

  const addToPreCartHandler = (newItem) => {
    const existingCartItemIndex = preCart.findIndex(
      (item) => item.id === newItem.id
    );

    if (existingCartItemIndex >= 0) {
      setPreCart((prevState) => {
        let newState = prevState;
        newState = newState.filter((item) => item.id !== newItem.id);

        //If Item count is zero remove item and return
        if (newItem.amount === 0) {
          return newState;
        }

        //Else update item amount with newItem object
        newState.push(newItem);
        return newState;
      });
    } else {
      setPreCart((prevState) => {
        return prevState.concat(newItem);
      });
    }
  };

  const updateCartHandler = (event) => {
    event.preventDefault();
    if (preCart.length !== 0) {
      setPreCart([]);
      updateCart(preCart);
    }
  };

  if (error) console.log(error);

  // Create Menu item components if data was retreived from database
  let menuContent;
  if (loading) {
    menuContent = <p>Loading...</p>;
  } else {
    menuContent = (
      <ul className={classes["menu-items"]}>
        {Object.keys(data).map((menuItem) => {
          let itemAmount = 0;

          if (preCart.length > 0) {
            const itemIndex = preCart.findIndex(
              (item) => item.id === data[menuItem].id
            );
            if (itemIndex >= 0) {
              itemAmount = preCart[itemIndex].amount;
            }
          }

          const newMenuItem = (
            <MenuItem
              key={data[menuItem].id}
              id={data[menuItem].id}
              price={data[menuItem].price}
              name={menuItem}
              description={data[menuItem].description}
              amount={itemAmount}
              onAddToPreCart={addToPreCartHandler}
            />
          );

          return newMenuItem;
        })}
      </ul>
    );
  }

  return (
    <Card id="menu" className={classes["menu-card"]}>
      <form onSubmit={updateCartHandler}>
        {menuContent}
        <Button className={classes["menu-submit"]} label="Add to Cart" />
        <Button
          className={classes["menu-clear"]}
          onClick={() => setPreCart([])}
          label="Clear"
        />
      </form>
    </Card>
  );
};

export default React.memo(Menu);
