import { AnimatePresence,motion } from "framer-motion";
import React from "react";
import { Link } from "react-router";

import { compoundClasses } from "../../../../utils/compoundClasses";
import AnimatedButton from "../../../ui/AnimatedButton";
import AuthButtons from "../AuthButtons";
import { navigationItems } from "../NavigationItems";

interface MobileNavigationProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  loginStatus: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  activeSection, 
  setActiveSection, 
  loginStatus 
}) => {
  const navItemVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.02, x: 2 },
    active: { scale: 1.02 }
  };

  const mobileMenuVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  };

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

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={compoundClasses.navigation.mobileBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setMobileMenuOpen(false);
            }}
          />
          
          {/* Mobile Menu Panel - Slide-in from Right */}
          <motion.div
            className={compoundClasses.navigation.mobileMenu}
            variants={mobileMenuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="p-6 space-y-6">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-white/20 pb-4">
                <h3 className="text-lg font-semibold text-white">Menu</h3>
                <AnimatedButton 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="material-icons md-24">close</span>
                </AnimatedButton>
              </div>
              
              {/* Mobile Menu Items */}
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
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
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
              <div className="border-t border-white/20 pt-6">
                <AuthButtons 
                  loginStatus={loginStatus} 
                  variant="mobile"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
