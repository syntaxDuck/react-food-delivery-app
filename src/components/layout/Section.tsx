import { motion } from "framer-motion";
import React from "react";

import { useReducedMotion } from "../../functions/useReducedMotion";
import { compoundClasses } from "../../utils/compoundClasses";

interface SectionProps {
  id: string;
  className?: string;
  background?: string;
  padding?: string;    // NEW DEFAULT
  spacing?: string;         // NEW PROP
  container?: boolean;            // NEW PROP
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  id,
  className = "",
  background = "transparent",
  padding = "comfortable",
  spacing = "normal",
  container = true,
  children
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
    gradient: "bg-gradient-to-b from-transparent via-primary/4 to-transparent",
    dark: "bg-bg-dark/20"
  };

  // Subtle animation variants
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: prefersReducedMotion ? "tween" as const : "spring" as const,
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
        ${paddingClasses[padding as keyof typeof paddingClasses]} 
        ${spacingClasses[spacing as keyof typeof spacingClasses]} 
        ${backgroundClasses[background as keyof typeof backgroundClasses]} 
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
