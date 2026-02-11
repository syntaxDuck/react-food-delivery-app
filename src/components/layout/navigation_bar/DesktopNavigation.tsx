import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { compoundClasses } from "../../../utils/compoundClasses";
import { navigationItems } from "./NavigationItems";
import AuthButtons from "./AuthButtons";

interface DesktopNavigationProps {
  loginStatus: boolean;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ loginStatus, activeSection, setActiveSection }) => {
  return (
    <nav className={compoundClasses.navigation.header}>
      {navigationItems.map((menuElement, index) => (
        <motion.div
          key={menuElement.id}
          className="basis-1/3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover="hover"
          transition={{ delay: index * 0.05 }}
        >
          <Link
            to={menuElement.id === "about-us" ? "/index" : "/index"}
            className={`
              ${compoundClasses.navigation.item}
              ${activeSection === menuElement.id ? compoundClasses.chrono?.activeGlow : ''}
            `}
            onClick={() => {
              setActiveSection(menuElement.id);
              if (menuElement.id !== "about-us") {
                const element = document.getElementById(menuElement.id);
                element?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <span className="material-icons md-18 mr-3">{menuElement.icon}</span>
            <span className="font-medium">{menuElement.text}</span>
          </Link>
        </motion.div>
      ))}
      <AuthButtons loginStatus={loginStatus} className="hidden md:flex" />
    </nav>
  );
};

export default DesktopNavigation;