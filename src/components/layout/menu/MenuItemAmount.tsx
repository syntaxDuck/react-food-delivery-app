import React from "react";
import { motion } from "framer-motion";

const buttonVariants = {
  tap: { scale: 0.9 },
  hover: { scale: 1.05 },
  disabled: { opacity: 0.5, cursor: "not-allowed" }
};

const MenuItemAmount = ({ amount, onAddToPreCart }) => {
  const incrementCountHandler = () => {
    if (amount >= 99) return;
    onAddToPreCart(amount + 1);
  };

  const decrementCountHandler = () => {
    if (amount <= 0) return;
    onAddToPreCart(amount - 1);
  };

  const handleAddToCart = () => {
    if (amount > 0) {
      onAddToPreCart(amount);
    }
  };

  return (
    <div className="flex items-center justify-between space-x-3">
      <div className="flex items-center space-x-2">
        <motion.button
          className="w-10 h-10 bg-secondary text-dark-gray rounded-full flex items-center justify-center font-bold text-lg hover:bg-secondary/80 transition-colors shadow-md"
          type="button"
          onClick={decrementCountHandler}
          disabled={amount <= 0}
          aria-label="Decrease quantity"
          variants={buttonVariants}
          whileHover={amount > 0 ? "hover" : undefined}
          whileTap={amount > 0 ? "tap" : undefined}
          animate={amount <= 0 ? "disabled" : undefined}
        >
          <span className="material-icons md-20">remove</span>
        </motion.button>
        
        <motion.div
          className="w-16 h-12 bg-white/20 rounded-lg flex items-center justify-center font-bold text-white text-lg border border-white/30 min-w-[4rem]"
          key={amount}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          {amount}
        </motion.div>
        
        <motion.button
          className="w-10 h-10 bg-secondary text-dark-gray rounded-full flex items-center justify-center font-bold text-lg hover:bg-secondary/80 transition-colors shadow-md"
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
        className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
          amount > 0 
            ? 'bg-primary text-white hover:bg-primary/90 shadow-lg' 
            : 'bg-white/10 text-white/50 border border-white/20 cursor-not-allowed'
        }`}
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
};

export default React.memo(MenuItemAmount);