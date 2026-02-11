import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import Card from "./Card";

const modalVariants: Variants = {
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

interface ModalProps {
  className?: string;
  children: ReactNode;
}

const Modal = ({ className = "", children }: ModalProps) => {
  return (
    <motion.div
      className={className}
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
