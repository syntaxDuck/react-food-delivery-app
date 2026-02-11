import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const cardVariants: Variants = {
  initial: { opacity: 0, y: 15 },  // Reduced from 20
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring", 
      stiffness: 80,   // Reduced from 100
      damping: 20,     // Increased from 15
      duration: 0.5    // Reduced from 0.6
    } 
  },
  hover: { 
    scale: 1.01,      // Reduced from 1.02
    y: -3,           // Reduced from -5
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 200, damping: 25 }  // Softer
  }
};

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  initial?: boolean;
  delay?: number;
}

const AnimatedCard = ({ 
  children, 
  className = "", 
  hover = true,
  initial = true,
  delay = 0,
  ...props 
}: AnimatedCardProps) => {
  // Enhanced base classes with better padding
  const baseClasses = "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sm:p-8 shadow-xl transition-all duration-300";
  const classes = `${baseClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      variants={cardVariants}
      initial={initial ? "initial" : false}
      animate="animate"
      whileHover={hover ? "hover" : undefined}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
