import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { motion, type Variants } from "framer-motion";
import { compoundClasses } from "../../../utils/compoundClasses";

//Component Imports
import CartButton from "../../cart/CartButton";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigationButton from "./mobile/MobileNavigationButton";
import MobileNavigation from "./mobile/MobileNavigation";

//Functional Imports
import { useCart } from "../../cart/cart_context/CartCtxProvider";

interface NavigationBarProps {
  loginStatus: boolean
}

const NavigationBar: React.FC<NavigationBarProps> = ({ loginStatus }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about-us');
  const toggleCart = useCart().toggleCart;

  const menuElements = [
    { id: "menu", text: "menu", icon: "restaurant_menu" },
    { id: "location", text: "location", icon: "location_on" },
    { id: "about-us", text: "About Us", icon: "info" },
  ];

  const navVariants: Variants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: {} },
    hover: { scale: 1.01 }  // Very subtle
  };

  const mobileMenuVariants: Variants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  };

  const navItemVariants: Variants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.02, x: 2 },  // Very subtle
    active: { scale: 1.02 }         // Very subtle
  };

  return (
    <motion.header
      className={compoundClasses.navigation.header}
      variants={navVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className={compoundClasses.navigation.container}>
        <div className="flex flex-row items-center justify-evenly">
          {/* Enhanced Logo - Clickable to navigate home */}
          <Link to="/index">
            <motion.div
              className={compoundClasses.navigation.logo}
              whileHover={{ scale: 1.02, y: -1 }}  // Slightly more noticeable
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <span className="text-2xl md:text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">
                chrono delivery
              </span>
              <motion.span
                className="material-icons md-36 md:md-40 text-primary"
                initial={{ rotate: -2 }}
                animate={{ rotate: [0, 8, -2, 0] }}
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
          <div className="hidden md:flex">
            <DesktopNavigation
              loginStatus={loginStatus}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Mobile Menu Button - Hidden on Desktop */}
          <div className="flex md:hidden">
            <MobileNavigationButton
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>

          {/* Cart Button */}
          <CartButton onCartStateChange={toggleCart} />
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

export default React.memo(NavigationBar);
