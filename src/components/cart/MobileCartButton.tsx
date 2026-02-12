import { motion, type Variants } from "framer-motion";
import React from "react";

import AnimatedButton from "../ui/AnimatedButton";

interface MobileCartButtonProps {
  onClick: () => void;
  animate: boolean;
}

const iconVariants: Variants = {
  initial: { x: -18, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

const MobileCartButton = ({ onClick, animate }: MobileCartButtonProps) => {
  const [showLabel, setShowLabel] = React.useState(false);

  React.useEffect(() => {
    if (!animate) {
      setShowLabel(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowLabel(true);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [animate]);

  return (
    <AnimatedButton
      variant="default"
      size="lg"
      className="w-full justify-center"
      onClick={onClick}
    >
      <motion.span
        className="material-icons md-20 mr-2"
        variants={iconVariants}
        initial="initial"
        animate={animate ? "animate" : "initial"}
        onAnimationComplete={() => {
          if (animate) {
            setShowLabel(true);
          }
        }}
      >
        shopping_cart
      </motion.span>
      {showLabel && <span>Cart</span>}
    </AnimatedButton>
  );
};

export default MobileCartButton;
