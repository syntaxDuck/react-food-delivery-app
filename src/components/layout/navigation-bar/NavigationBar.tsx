import { motion, type Variants } from "framer-motion";
import { memo, useState } from "react";
import { Link } from "react-router";

import { compoundClasses } from "../../../utils/compoundClasses";
//Functional Imports
import { useCart } from "../../cart/cart-context/CartContext";
//Component Imports
import CartButton from "../../cart/CartButton";
import AnimatedButton from "../../ui/AnimatedButton";
import AuthButtons from "./AuthButtons";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./mobile/MobileNavigation";

interface NavigationBarProps {
  loginStatus: boolean;
  isLightTheme: boolean;
  onToggleTheme: () => void;
}

const NavigationBar = ({ loginStatus, isLightTheme, onToggleTheme }: NavigationBarProps) => {
  const [activeSection, setActiveSection] = useState('about-us');
  const toggleCart = useCart().toggleCart;

  const navVariants: Variants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <>
      <motion.header
        className={`lg:fixed ${compoundClasses.navigation.header}`}
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
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
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
                  <span className="text-xl md:text-2xl font-bold text-gradient-brand group-hover:opacity-85 transition-opacity duration-300 whitespace-nowrap">
                    chrono delivery
                  </span>
                  <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-text/60 whitespace-nowrap">
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

            <div className="hidden lg:flex">
              <DesktopNavigation
                activeSection={activeSection}
                setActiveSection={setActiveSection}
              />
            </div>

            <div className="flex flex-row gap-4 items-center">
              <AnimatedButton
                variant="ghost"
                size="sm"
                onClick={onToggleTheme}
                className="min-w-[44px]"
              >
                <span className="material-icons md-20">{isLightTheme ? "dark_mode" : "light_mode"}</span>
                <span className="sr-only">Toggle theme</span>
              </AnimatedButton>
              <CartButton onCartStateChange={toggleCart} />
              <div className="hidden lg:flex">
                <AuthButtons loginStatus={loginStatus} />
              </div>
            </div>
          </div>

        </div>
      </motion.header>

      <MobileNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        loginStatus={loginStatus}
        isLightTheme={isLightTheme}
        onToggleTheme={onToggleTheme}
      />
    </>
  );
};

export default memo(NavigationBar);
