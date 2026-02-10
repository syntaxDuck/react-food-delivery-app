import React from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

const Button = ({ href, className, onClick, disabled, label, type }) => {
  const baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray";
  const defaultClasses = "bg-transparent border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary";
  
  const finalClasses = className || `${baseClasses} ${defaultClasses}`;

  const buttonContent = (
    <>
      {label && <span>{label}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={finalClasses}
        onClick={onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={finalClasses}
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;