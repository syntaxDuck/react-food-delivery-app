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
  const [amount, setAmount] = React.useState(amountInCart);

  const incrementCountHandler = () => {
    if (amount >= max) return;
    const newAmount = amount + 1;
    onIncrease();
    setAmount(newAmount);
  };

  const decrementCountHandler = () => {
    if (amount <= min) return;
    const newAmount = amount - 1;
    onDecrease();
    setAmount(newAmount);
  };

  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.button
        className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg hover:bg-primary/80 transition-colors shadow-md"
        type="button"
        onClick={incrementCountHandler}
        disabled={amount >= 99}
        aria-label="Increase quantity"
        variants={buttonVariants}
        whileHover={!(amount >= max) ? "hover" : undefined}
        whileTap={!(amount >= max) ? "tap" : undefined}
        animate={amount >= max ? "disabled" : undefined}
      >
        <span className="material-icons md-18">add</span>
      </motion.button>

      <motion.div
        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-white min-w-[3rem] border border-white/30"
        key={amount}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
      >
        {amount}
      </motion.div>

      <motion.button
        className="w-8 h-8 bg-secondary text-dark-gray rounded-full flex items-center justify-center font-bold text-lg hover:bg-secondary/80 transition-colors shadow-md"
        type="button"
        onClick={decrementCountHandler}
        disabled={amount <= 0}
        aria-label="Decrease quantity"
        variants={buttonVariants}
        whileHover={!(amount <= min) ? "hover" : undefined}
        whileTap={!(amount <= min) ? "tap" : undefined}
        animate={amount <= min ? "disabled" : undefined}
      >
        <span className="material-icons md-18">remove</span>
      </motion.button>
    </motion.div>
  );
};

export default CartItemAmount;
