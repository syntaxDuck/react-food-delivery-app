import { motion, type Variants } from "framer-motion";
import { memo, useState } from "react";
import { Link } from "react-router";

import { compoundClasses } from "../../../utils/compoundClasses";
//Functional Imports
import { useCart } from "../../cart/cart-context/CartCtx";
//Component Imports
import CartButton from "../../cart/CartButton";
import AuthButtons from "./AuthButtons";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./mobile/MobileNavigation";

interface NavigationBarProps {
  loginStatus: boolean
}

const NavigationBar = ({ loginStatus }: NavigationBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about-us');
  const toggleCart = useCart().toggleCart;

  const navVariants: Variants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <motion.header
      className={compoundClasses.navigation.header}
      variants={navVariants}
      initial="initial"
      animate="animate"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />
      <div className={compoundClasses.navigation.container}>
        <div className="flex flex-row items-center justify-between gap-4">
          {/* Enhanced Logo - Clickable to navigate home */}
          <Link to="/index">
            <motion.div
              className={compoundClasses.navigation.logo}
              whileHover={{ scale: 1.02, y: -1 }}  // Slightly more noticeable
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="flex flex-col leading-none">
                <span className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300 whitespace-nowrap">
                  chrono delivery
                </span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">
                  time to taste
                </span>
              </div>
              <motion.span
                className="material-icons md-36 md:md-40 text-primary"
                animate={{
                  rotate: [0, 8, -2, 0],
                  scale: [1, 1.05, 1.02, 1]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              >
                rocket_launch
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Hidden on Mobile */}

          <div className="hidden lg:flex">
            <DesktopNavigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Cart Button */}
          <div className="flex flex-row gap-4 items-center">
            <CartButton onCartStateChange={toggleCart} />
            <div className="hidden md:flex">
              <AuthButtons loginStatus={loginStatus} />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Slide-in from Right */}
        <MobileNavigation
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          loginStatus={loginStatus}
        />
      </div>
    </motion.header>
  );
};

export default memo(NavigationBar);
