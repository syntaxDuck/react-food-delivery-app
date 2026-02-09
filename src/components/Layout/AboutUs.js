import React from "react";

//import assest
import drone from "../../assets/images/drone.jpg";

//Component imports
import Card from "../UI/Card";

//Styles imports
import classes from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div id="about-us" className={classes["about-us-wrapper"]}>
      <Card className={classes["about-us-card"]}>
        <h3>Welcome to Chrono Delivery!</h3>
        <p>
          We have everything for your daily delivery needs! Please keep an eye
          out for new items for our menu is constantly being updated with local
          cuisine from several restaurants in your area. All this at one flat
          delivery charge!
        </p>
        <h3>Hours</h3>
        <p>
          Chrono delviery is proud to be the only delivery app that can delivery
          whatever you want whenver you want! This means you can order your
          favority dish from you favorit breakfast joint at 3am if desired, hey
          we dont judge we just deliver!
        </p>
        <h3>Charges</h3>
        <p>
          On top of our indestry leading any time anything delivery survace we
          also hav a flat rate delivery fee of only $5! This can be done by our
          propriatary autonomous drones that deliver your food any time on time!
        </p>
      </Card>
      <Card className={`${classes["about-us-card"]} ${classes["image-card"]}`}>
        <img src={drone} alt="drone" />
      </Card>
    </div>
  );
};

export default React.memo(AboutUs);
