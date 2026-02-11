import { motion, AnimatePresence } from "framer-motion";

//Component Imports
import Cart from "../components/cart/Cart.tsx";
import Menu from "../components/layout/menu/Menu";
import AboutUs from "../components/layout/About";
import Location from "../components/layout/Location";

//Functional Imports
import { useCart } from "../components/cart/cart_context/CartCtxProvider";

//Styles
import MotionContainer from "../components/ui/MotionContainer";

const HomePage = () => {
  const cartActive = useCart().state.cartActive;

  return (
    <MotionContainer>
      <>
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
      </>
    </MotionContainer>
  );
};

export default HomePage;
