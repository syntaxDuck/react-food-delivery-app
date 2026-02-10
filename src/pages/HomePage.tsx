import React, { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

//Component Imports
import Cart from "../components/cart/Cart";
import Menu from "../components/layout/menu/Menu";
import AboutUs from "../components/layout/About";
import Location from "../components/layout/Location";

//Functional Imports
import { useCart } from "../components/cart/cart_context/CartCtxProvider";

//Styles
import MotionContainer from "../components/ui/MotionContainer";

const HomePage = () => {
  const cartActive = useCart().cartActive;



  return (
    <MotionContainer>
      <Fragment>
        <AnimatePresence>
          {cartActive && <Cart />}
        </AnimatePresence>

        <motion.div
          className={`min-h-screen transition-all duration-300 ${cartActive ? 'filter blur-sm' : ''}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
              delayChildren: 0.1
            }
          }}
        >
          <AboutUs />
          <Menu />
          <Location />
        </motion.div>
      </Fragment>
    </MotionContainer>
  );
};

export default HomePage;
