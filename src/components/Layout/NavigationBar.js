import React from "react";
import { Link } from "react-router-dom";

//Component Imports
import classes from "./navigationBar.module.css";
import Button from "../UI/Button";
import CartButton from "../Cart/CartButton";

//Functional Imports
import { useCart } from "../Cart/CartContext/CartCtxProvider";

const NavigationBar = (props) => {
  const menuElements = [
    {
      id: "menu",
      text: "menu",
    },
    {
      id: "location",
      text: "location",
    },
    {
      id: "about-us",
      text: "About Us",
    },
  ];

  const toggleCart = useCart().toggleCart;

  const logoutHandler = () => {
    window.location.reload(false);
  };

  const Buttons = (
    <ul className={classes["nav-buttons"]}>
      {menuElements.map((menuElement) => (
        <Link key={menuElement.id} to="/index">
          <Button
            href={`#${menuElement.id}`}
            key={menuElement.id}
            className={classes["nav-button"]}
            label={menuElement.text}
          />
        </Link>
      ))}
      {!props.loginStatus && (
        <Link key={"login"} to="/Login">
          <Button
            className={classes["nav-button"]}
            key={"login"}
            label={"Login"}
          />
        </Link>
      )}
      {props.loginStatus && (
        <Button
          onClick={logoutHandler}
          className={`${classes["welcome-tag"]} ${classes["nav-button"]}`}
          label={"Logout"}
        />
      )}
    </ul>
  );

  return (
    <header className={classes["nav-bar"]}>
      <span className={classes.title}>
        chrono delivery
        <span className="material-icons md-36" aria-hidden="true">
          rocket_launch
        </span>
      </span>
      <div className={classes["button-container"]}>
        {Buttons}
        <CartButton onCartStateChange={toggleCart} />
      </div>
    </header>
  );
};

export default React.memo(NavigationBar);
