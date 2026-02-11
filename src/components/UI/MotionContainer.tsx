import { motion, AnimatePresence, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const pageVariants: Variants = {
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

interface MotionContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const MotionContainer = ({ 
  children, 
  className = "",
  delay = 0
}: MotionContainerProps) => {
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

interface PageTransitionProps {
  children: ReactNode;
  location: string;
}

export const PageTransition = ({ children, location }: PageTransitionProps) => {
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
