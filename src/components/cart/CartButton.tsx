import type { Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { useCart } from "./cart-context/CartCtxProvider";

const buttonVariants: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  hover: {
    scale: 1.05,
    rotate: [0, -3, 3, 0],
    transition: {
      scale: { type: "spring", stiffness: 300, damping: 15 },
      rotate: { duration: 0.4, repeat: 1 }
    }
  },
  tap: { scale: 0.95 }
};

const badgeVariants: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  pop: {
    scale: [1, 1.3, 1],
    opacity: [1, 1, 1],
    transition: { duration: 0.3 }
  }
};

interface CartButtonProps {
  onCartStateChange: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onCartStateChange }) => {
  const { items } = useCart().state;
  const [isBouncing, setIsBouncing] = React.useState(false);

  let itemTotal = 0;
  if (items.length > 0) {
    itemTotal = items.reduce((total, item) => total + item.amount, 0);
  }

  React.useEffect(() => {
    if (itemTotal > 0 && !isBouncing) {
      setIsBouncing(true);
      setTimeout(() => {
        setIsBouncing(false);
      }, 500);
    }
  }, [itemTotal, isBouncing]);

  const handleClick = (): void => {
    onCartStateChange();
  };

  return (
    <motion.button
      className="relative p-2 bg-primary rounded-full shadow-lg hover:shadow-primary/30 group"
      onClick={handleClick}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      aria-label="View shopping cart"
    >
      <motion.span
        className="material-icons md-36 text-white relative top-1"
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        shopping_cart
      </motion.span>

      <AnimatePresence>
        {itemTotal > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 bg-secondary text-dark-gray text-xs font-bold rounded-full min-w-[20px] min-h-[20px] flex items-center justify-center border-2 border-white"
            variants={badgeVariants}
            initial="initial"
            animate={isBouncing ? "pop" : "animate"}
            exit={{ scale: 0, opacity: 0 }}
            key={itemTotal}
          >
            {itemTotal}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CartButton;
