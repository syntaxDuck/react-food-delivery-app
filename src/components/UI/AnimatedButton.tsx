import React from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: { 
    scale: 1.02,  // Reduced from 1.05
    transition: { type: "spring", stiffness: 300, damping: 20 }  // Softer
  },
  tap: { 
    scale: 0.98,  // Reduced from 0.95
    transition: { type: "spring", stiffness: 400, damping: 20 }
  },
  disabled: { 
    opacity: 0.6, 
    cursor: "not-allowed" 
  }
};

const AnimatedButton = ({ 
  href, 
  className = "", 
  onClick, 
  disabled = false, 
  label, 
  type = "button",
  variant = "default",
  size = "md",
  children 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray";
  
  const variantClasses = {
    default: "bg-primary hover:bg-primary/90 text-white border border-primary focus:ring-primary",
    secondary: "bg-secondary hover:bg-secondary/90 text-dark-gray border border-secondary focus:ring-secondary",
    outline: "bg-transparent hover:bg-primary/10 text-primary border border-primary focus:ring-primary",
    ghost: "bg-transparent hover:bg-white/10 text-white border border-transparent focus:ring-white"
  };
  
  // Enhanced size classes with better spacing
  const sizeClasses = {
    xs: "px-2 py-1 text-xs min-w-[40px]",
    sm: "px-3 py-1.5 text-sm min-w-[60px]",
    md: "px-4 py-2 text-base min-w-[80px]",
    lg: "px-6 py-3 text-lg min-w-[120px]",
    xl: "px-8 py-4 text-xl min-w-[160px]"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const buttonContent = (
    <>
      <span className="material-icons md-18 mr-2">
        {label?.includes('Cart') ? 'shopping_cart' : 
         label?.includes('Clear') ? 'clear' : 
         label?.includes('Login') ? 'login' : 'arrow_forward'}
      </span>
      {label}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {children || buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      animate={disabled ? "disabled" : undefined}
    >
      {children || buttonContent}
    </motion.button>
  );
};

export default AnimatedButton;
