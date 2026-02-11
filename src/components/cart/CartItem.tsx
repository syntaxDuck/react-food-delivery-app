import React from "react";
import { motion } from "framer-motion";
import CartItemAmount from "./CartItemAmount";
import type { CartItemType } from "./CartTypes";
import type { Variants } from "framer-motion";

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 }
  }
};

interface CartItemProps {
  item: CartItemType;
  onRemove: (itemId: string) => void;
  onUpdateAmount: (item: CartItemType) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onRemove,
  onUpdateAmount
}) => {
  const formattedPrice = (item.price * item.amount).toFixed(2);

  const handleRemove = (): void => {
    onRemove(item.id);
  };

  const handleUpdateAmount = (newAmount: number): void => {
    // Create new object instead of mutating the prop
    const updatedItem = { ...item, amount: newAmount };
    onUpdateAmount(updatedItem);
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
          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
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
          {item.amount} × ${item.price.toFixed(2)} ={" "}
          <span className="text-primary font-semibold text-base ml-1">
            ${formattedPrice}
          </span>
        </div>
      </div>

      <CartItemAmount
        amountInCart={item.amount}
        onIncrease={() => handleUpdateAmount(item.amount + 1)}
        onDecrease={() => handleUpdateAmount(Math.max(1, item.amount - 1))}
      />
    </motion.div>
  );
};

export default CartItem;
