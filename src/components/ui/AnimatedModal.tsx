import { AnimatePresence, motion, type Variants } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";

const modalVariants: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.75, 
    transition: { duration: 0.2, ease: "easeIn" } 
  },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.75, 
    transition: { duration: 0.2, ease: "easeIn" } 
  }
};

const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const sizeClasses = {
  sm: "max-w-sm w-11/12 md:w-96",
  md: "max-w-2xl w-11/12 md:w-3/4 lg:w-2/3",
  lg: "max-w-6xl w-11/12 md:w-5/6 lg:w-4/5"
} as const;

type ModalSize = keyof typeof sizeClasses;

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
}

const AnimatedModal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "",
  size = "md",
  closeOnBackdrop = true
}: AnimatedModalProps) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className={`${sizeClasses[size]} ${className} bg-dark-gray border border-border/70 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar`}
            variants={modalVariants}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedModal;
