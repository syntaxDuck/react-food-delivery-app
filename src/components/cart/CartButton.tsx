import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./cart_context/CartCtxProvider";

const buttonVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  hover: {
    scale: 1.05,  // Reduced from 1.1
    rotate: [0, -3, 3, 0],  // Reduced rotation
    transition: {
      scale: { type: "spring", stiffness: 300, damping: 15 },  // Softer
      rotate: { duration: 0.4, repeat: 1 }  // Shorter
    }
  },
  tap: { scale: 0.95 }  // Reduced from 0.9
};

const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  pop: {
    scale: [1, 1.3, 1],
    opacity: [1, 1, 1],
    transition: { duration: 0.3 }
  }
};

const CartButton = ({ onCartStateChange }) => {
  const { items } = useCart();
  const [isBouncing, setIsBouncing] = React.useState(false);

  const itemTotal = items.reduce((total, item) => total + item.amount, 0);

  React.useEffect(() => {
    if (itemTotal > 0 && !isBouncing) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }
  }, [itemTotal, isBouncing]);

  const handleClick = () => {
    onCartStateChange();
  };

  return (
    <motion.button
      className="relative p-3 bg-primary rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 group"
      onClick={handleClick}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      aria-label="View shopping cart"
    >
      <motion.span
        className="material-icons md-36 text-white"
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
