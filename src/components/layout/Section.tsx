import React from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../functions/useReducedMotion";
import { compoundClasses } from "../../utils/compoundClasses";

const Section = ({ 
  children, 
  id, 
  className = "", 
  background = "transparent",
  padding = "comfortable",    // NEW DEFAULT
  spacing = "normal",         // NEW PROP
  container = true            // NEW PROP
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Updated padding classes with py-20 as default
  const paddingClasses = {
    cozy: 'py-16',
    comfortable: 'py-20',     // NEW DEFAULT
    spacious: 'py-24',
    luxurious: 'py-28',
    none: ''
  };

  // New spacing classes for section separation
  const spacingClasses = {
    none: '',
    tight: 'mb-8',
    normal: 'mb-16',
    relaxed: 'mb-20',
    loose: 'mb-24',
  };

  const backgroundClasses = {
    transparent: "",
    gradient: "bg-gradient-to-b from-transparent to-primary/5",
    dark: "bg-dark-gray/50"
  };

  // Subtle animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: prefersReducedMotion ? "tween" : "spring", 
        stiffness: prefersReducedMotion ? 50 : 80,  // Softer spring
        damping: prefersReducedMotion ? 25 : 20,   // More damping
        duration: prefersReducedMotion ? 0.3 : 0.6  // Shorter duration
      }
    }
  };

  const containerClass = container ? compoundClasses.section.container : '';

  return (
    <motion.section 
      id={id} 
      className={`
        ${paddingClasses[padding]} 
        ${spacingClasses[spacing]} 
        ${backgroundClasses[background]} 
        ${className}
      `}
      variants={sectionVariants}
      initial="initial"
      animate="animate"
    >
      <div className={containerClass}>
        {children}
      </div>
    </motion.section>
  );
};

export default React.memo(Section);
