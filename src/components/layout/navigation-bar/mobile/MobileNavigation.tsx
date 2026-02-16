import { AnimatePresence, motion, type Variants } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router";

import { compoundClasses } from "../../../../utils/compoundClasses";
import { useCart } from "../../../cart/cart-context/CartContext";
import MobileCartButton from "../../../cart/MobileCartButton";
import AnimatedButton from "../../../ui/AnimatedButton";
import AuthButtons from "../AuthButtons";
import { navigationItems } from "../NavigationItems";

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  loginStatus: boolean;
  isLightTheme: boolean;
  onToggleTheme: () => void;
}

const navItemVariants: Variants = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  hover: { scale: 1.02, x: 2 },
  active: { scale: 1.02 }
};

const mobileMenuVariants: Variants = {
  initial: { x: "100%" },
  animate: { x: 0, transition: { duration: 0.5, type: "spring", stiffness: 250, damping: 25 } },
  exit: { x: "100%" }
};

const slideButtonStyle = `fixed top-25 h-20 w-7 z-50 flex items-center gap-2 surface-glass 
text-text px-3 py-1.5 rounded-l-xl shadow-2xl`;

const chevronStyle = "relative right-3 material-icons md-20";
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  activeSection,
  setActiveSection,
  loginStatus,
  isLightTheme,
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleCart = useCart().toggleCart;

  const toggleLabel = mobileMenuOpen ? "Close menu" : "Open menu";
  const toggleIcon = mobileMenuOpen ? "chevron_right" : "chevron_left";

  const handleNavigationClick = (menuElement: { id: string; icon: string; text: string }) => {
    setActiveSection(menuElement.id);

    // Handle smooth scroll to section
    if (menuElement.id !== 'about-us') {
      const element = document.getElementById(menuElement.id);
      element?.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu
    setMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    toggleCart();
    setMobileMenuOpen(false);
  };

  return (
    <>
      {mobileMenuOpen &&
        <motion.div
          className={compoundClasses.navigation.mobileBackdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        />
      }
      <AnimatePresence>
        <motion.div
          id="mobile-nav-panel"
          className={compoundClasses.navigation.mobileMenu}
          variants={mobileMenuVariants}
          initial="initial"
          animate={mobileMenuOpen ? "animate" : "exit"}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <motion.button
            type="button"
            className={`-left-7 ${slideButtonStyle}`}
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={toggleLabel}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
          >
            <span className={chevronStyle}>{toggleIcon}</span>
          </motion.button>

          <div className="surface-strong m-4 space-y-6">
            <div className="space-y-2">
              {navigationItems.map((menuElement) => (
                <motion.div
                  key={menuElement.id}
                  variants={navItemVariants}
                  whileHover="hover"
                  transition={{ delay: 0.05 }}
                >
                  <Link
                    to={menuElement.id === "about-us" ? "/index" : "/index"}
                    className={`
                          w-full px-4 py-3 text-left rounded-lg transition-all duration-200 flex items-center
                          ${activeSection === menuElement.id
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'text-text/70 hover:text-text hover:bg-bg-light/20 border border-transparent'
                      }
                        `}
                    onClick={() => {
                      handleNavigationClick(menuElement);
                    }}
                  >
                    <span className="material-icons md-20 mr-3">{menuElement.icon}</span>
                    <span className="font-medium">{menuElement.text}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t border-border/60 pt-6">
              <div className="pb-4">
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={onToggleTheme}
                  className="w-full"
                >
                  <span className="material-icons md-18 mr-2">
                    {isLightTheme ? "dark_mode" : "light_mode"}
                  </span>
                  {isLightTheme ? "Dark Mode" : "Light Mode"}
                </AnimatedButton>
              </div>
              <div className="pb-4">
                <MobileCartButton onClick={handleCartClick} animate={mobileMenuOpen} />
              </div>
              <AuthButtons
                loginStatus={loginStatus}
                variant="mobile"
                className="w-full"
                onAuthAction={() => { setMobileMenuOpen(false); }}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence >
    </>
  );
};

export default MobileNavigation;
