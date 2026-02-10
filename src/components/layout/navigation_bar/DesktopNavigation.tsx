import React from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { compoundClasses } from "../../../utils/compoundClasses";
// Temporarily inline variants since NavigationVariants.js doesn't exist
const navVariants = {
  navItem: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.02, x: 2 },
    active: { scale: 1.02 }
  }
};

import { navigationItems, getActiveItemClass } from "./NavigationItems";
import AuthButtons from "./AuthButtons";

interface DesktopNavigationProps {
  loginStatus: boolean,
  activeSection: string,
  setActiveSection: CallableFunction
}


// Clean desktop navigation component - only renders on desktop
const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ loginStatus, activeSection, setActiveSection }) => {

  return (
    <nav className='flex flex-row justify-center items-center space-x-3'>
      {navigationItems.map((menuElement, index) => (
        <motion.div
          key={menuElement.id}
          className="basis-1/3"
          variants={navVariants.navItem}
          initial="initial"
          animate={activeSection === menuElement.id ? "active" : "animate"}
          whileHover="hover"
          transition={{ delay: index * 0.05 }}
        >
          <Link
            to={menuElement.id === "about-us" ? "/index" : "/index"}
            className={`
                ${compoundClasses.navigation.item}
                ${getActiveItemClass(activeSection === menuElement.id)}
              `}
            onClick={() => {
              setActiveSection(menuElement.id);
              if (menuElement.id !== "about-us") {
                const element = document.getElementById(menuElement.id);
                element?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span className="material-icons md-18 mr-2">{menuElement.icon}</span>
            {menuElement.text}
          </Link>
        </motion.div>
      ))}
      <AuthButtons loginStatus={loginStatus} className="hidden md:flex" />
    </nav>
  );
};

export default DesktopNavigation;
