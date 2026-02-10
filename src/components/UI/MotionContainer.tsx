import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      duration: 0.6 
    } 
  },
  out: { 
    opacity: 0, 
    y: -20, 
    transition: { 
      duration: 0.3, 
      ease: "easeIn" 
    } 
  }
};

const MotionContainer = ({ 
  children, 
  className = "",
  animationType = "slide",
  delay = 0
}) => {
  const containerClasses = `w-full min-h-screen ${className}`;

  return (
    <motion.div
      className={containerClasses}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export const PageTransition = ({ children, location }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        className="w-full"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionContainer;