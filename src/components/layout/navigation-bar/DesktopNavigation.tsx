import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

import { compoundClasses } from "../../../utils/compoundClasses";
import { navigationItems } from "./NavigationItems";

interface DesktopNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ activeSection, setActiveSection }) => {
  return (
    <nav className={compoundClasses.navigation.desktop}>
      {navigationItems.map((menuElement, index) => (
        <motion.div
          key={menuElement.id}
          className="basis-1/3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: index * 0.05, type: "spring", stiffness: 320, damping: 22 }}
        >
          <Link
            to={menuElement.id === "about-us" ? "/index" : "/index"}
            className={`
              ${compoundClasses.navigation.item} group
              ${activeSection === menuElement.id ? 'glow-effect' : ''}
            `}
            onClick={() => {
              setActiveSection(menuElement.id);
              const element = document.getElementById(menuElement.id);
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="material-icons md-18 mr-3 transition-transform duration-200 group-hover:-translate-y-0.5">
              {menuElement.icon}
            </span>
            <span className="font-medium whitespace-nowrap transition-colors duration-200 group-hover:text-primary">
              {menuElement.text}
            </span>
          </Link>
        </motion.div>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
