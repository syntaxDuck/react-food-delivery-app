import { motion, type Variants } from "framer-motion";
import React, { useCallback, useMemo } from "react";

// Move static objects outside component to prevent recreation
const buttonVariants: Variants = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 },
  disabled: { opacity: 0.5, cursor: "not-allowed" }
};

// Memoized style functions to prevent recreation
const stepButton = `w-10 h-10 bg-white/20 text-dark-gray rounded-full flex items-center justify-center 
  font-bold text-lg hover:bg-secondary/80 transition-colors shadow-md`;

const counter = `w-16 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold 
  text-white text-lg border border-white/30 min-w-[4rem]`;

const cartButton = (amount: number) => `
  px-4 py-2 rounded-full font-medium cursor-pointer
  ${amount > 0
    ? 'bg-white/20 text-white hover:bg-primary/90 shadow-lg'
    : 'bg-white/10 text-white/50 border border-white/20'
  }`;

interface MenuItemAmountProps {
  amount: number;
  onAddToPreCart: (amount: number) => void;
}

const MenuItemAmount: React.FC<MenuItemAmountProps> = React.memo(({ amount, onAddToPreCart }) => {
  const incrementCountHandler = useCallback(() => {
    if (amount >= 99) return;
    onAddToPreCart(amount + 1);
  }, [amount, onAddToPreCart]);

  const decrementCountHandler = useCallback(() => {
    if (amount <= 0) return;
    onAddToPreCart(amount - 1);
  }, [amount, onAddToPreCart]);

  const handleAddToCart = useCallback(() => {
    if (amount > 0) {
      onAddToPreCart(amount);
    }
  }, [amount, onAddToPreCart]);

  // Memoize dynamic styles
  const currentCartButton = useMemo(() => cartButton(amount), [amount]);

  return (
    <div className="flex items-center justify-between space-x-3">
      <div className="flex items-center space-x-2">
        <motion.button
          className={stepButton}
          type="button"
          onClick={decrementCountHandler}
          disabled={amount <= 0}
          aria-label="Decrease quantity"
          variants={buttonVariants}
          whileHover={amount > 0 ? "hover" : undefined}
          whileTap={amount > 0 ? "tap" : undefined}
          animate={amount <= 0 ? "disabled" : undefined}>
          <span className="material-icons md-20">remove</span>
        </motion.button>
        <motion.div
          className={counter}
          key={amount}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {amount}
        </motion.div>

        <motion.button
          className={stepButton}
          type="button"
          onClick={incrementCountHandler}
          disabled={amount >= 99}
          aria-label="Increase quantity"
          variants={buttonVariants}
          whileHover={amount < 99 ? "hover" : undefined}
          whileTap={amount < 99 ? "tap" : undefined}
          animate={amount >= 99 ? "disabled" : undefined}
        >
          <span className="material-icons md-20">add</span>
        </motion.button>
      </div>

      <motion.button
        className={currentCartButton}
        type="button"
        onClick={handleAddToCart}
        disabled={amount <= 0}
        aria-label="Add to cart"
        variants={buttonVariants}
        whileHover={amount > 0 ? "hover" : undefined}
        whileTap={amount > 0 ? "tap" : undefined}
        animate={amount <= 0 ? "disabled" : undefined}
      >
        <span className="material-icons md-18 mr-2">shopping_cart</span>
        Add
      </motion.button>
    </div>
  );
});

export default MenuItemAmount;
