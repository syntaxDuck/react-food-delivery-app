import React from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  tap: { scale: 0.9 },
  hover: { scale: 1.1 },
  disabled: { opacity: 0.5, cursor: "not-allowed" }
};

interface CartItemAmountProps {
  amountInCart: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const CartItemAmount: React.FC<CartItemAmountProps> = ({ amountInCart, onIncrease, onDecrease, min = 0, max = 99 }) => {
  // Remove local state to prevent synchronization issues
  // Use amountInCart directly for all operations

  const incrementCountHandler = () => {
    if (amountInCart >= max) return;
    onIncrease();
  };

  const decrementCountHandler = () => {
    if (amountInCart <= min) return;
    onDecrease();
  };

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg hover:bg-primary/80 transition-colors shadow-md"
        type="button"
        onClick={incrementCountHandler}
        disabled={amountInCart >= max}
        aria-label="Increase quantity"
        variants={buttonVariants}
        whileHover={!(amountInCart >= max) ? "hover" : undefined}
        whileTap={!(amountInCart >= max) ? "tap" : undefined}
        animate={amountInCart >= max ? "disabled" : undefined}
      >
        <span className="material-icons md-18">add</span>
      </motion.button>

      <motion.div
        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-white min-w-[3rem] border border-white/30"
        key={amountInCart}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {amountInCart}
      </motion.div>

      <motion.button
        className="w-8 h-8 bg-secondary text-dark-gray rounded-full flex items-center justify-center font-bold text-lg hover:bg-secondary/80 transition-colors shadow-md"
        type="button"
        onClick={decrementCountHandler}
        disabled={amountInCart <= min}
        aria-label="Decrease quantity"
        variants={buttonVariants}
        whileHover={!(amountInCart <= min) ? "hover" : undefined}
        whileTap={!(amountInCart <= min) ? "tap" : undefined}
        animate={amountInCart <= min ? "disabled" : undefined}
      >
        <span className="material-icons md-18">remove</span>
      </motion.button>
    </div>
  );
};

export default CartItemAmount;
