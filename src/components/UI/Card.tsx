import React from "react";
import { motion, type Variants } from "framer-motion";

const cardVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
  hover: {
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

interface CardProps {
  id?: string,
  className?: string,
  hover?: boolean
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ className, children, id, hover = true }) => {
  const baseClasses = "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl";
  const classes = `${baseClasses} ${className || ""}`;

  return (
    <motion.div
      id={id}
      className={classes}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover={hover ? "hover" : undefined}
    >
      {children}
    </motion.div>
  );
};

export default Card;
