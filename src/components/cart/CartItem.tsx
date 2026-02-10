import React from "react";
import { motion } from "framer-motion";
import CartItemAmount from "./CartItemAmount";

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const CartItem = ({ id, name, price, itemAmountInCart, onUpdateCartItem }) => {
  const calculateItemDifferential = (newAmount) => {
    onUpdateCartItem([
      {
        id: id,
        amount: newAmount - itemAmountInCart,
      },
    ]);
  };

  const formattedPrice = (price * itemAmountInCart).toFixed(2);
  
  const handleRemove = () => {
    onUpdateCartItem([
      {
        id: id,
        amount: -itemAmountInCart,
      },
    ]);
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200 group"
    >
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <motion.button
            className="text-white/40 hover:text-red-400 transition-colors p-1"
            onClick={handleRemove}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="material-icons md-18">delete</span>
          </motion.button>
        </div>
        <div className="text-sm text-white/60">
          {itemAmountInCart} × ${price.toFixed(2)} ={" "}
          <span className="text-primary font-semibold text-base ml-1">
            ${formattedPrice}
          </span>
        </div>
      </div>
      
      <CartItemAmount
        onUpdateCart={calculateItemDifferential}
        amountInCart={itemAmountInCart}
      />
    </motion.div>
  );
};

export default CartItem;