import React from "react";
import { motion } from "framer-motion";
import Card from "./Card";

const modalVariants = {
  initial: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const Modal = ({ className, children }) => {
  return (
    <motion.div
      className={`${className}`}
      variants={modalVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Card hover={false}>
        {children}
      </Card>
    </motion.div>
  );
};

export default Modal;