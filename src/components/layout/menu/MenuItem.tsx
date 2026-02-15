import { motion, type Variants } from "framer-motion";
import React, { useMemo } from "react";

import type { CartItemType } from "../../cart/CartTypes";
import MenuItemAmount from "./MenuItemAmount";

// Move static objects outside component to prevent recreation
const itemVariants: Variants = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px color-mix(in oklab, var(--primary) 30%, transparent), 0 10px 10px -5px color-mix(in oklab, var(--primary) 20%, transparent)",
    transition: { type: "spring", stiffness: 400, damping: 15 }
  }
};

interface MenuItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  amount: number;
  onChangePreCartAmount: (item: CartItemType) => void;
  onAddItemToCart: (item: CartItemType) => void;
  delay?: number;
}

const MenuItem: React.FC<MenuItemProps> = React.memo(({
  id,
  name,
  price,
  description,
  amount,
  onChangePreCartAmount,
  onAddItemToCart,
  delay = 0
}) => {
  const formattedPrice = useMemo(() => `$${price.toFixed(2)}`, [price]);

  const changePreCartAmountHandler = (itemQuantity: number): void => {
    onChangePreCartAmount({
      id: id,
      name: name,
      price: price,
      amount: itemQuantity,
    });
  };

  const addItemToCartHandler = (itemQuantity: number): void => {
    onAddItemToCart({
      id: id,
      name: name,
      price: price,
      amount: itemQuantity,
    });
  };

  return (
    <motion.div
      id={id}
      className="surface-panel rounded-2xl overflow-hidden group h-full"
      variants={itemVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      transition={{ delay }}
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-text mb-2 group-hover:text-primary transition-colors truncate">
                {name}
              </h3>
              <p className="text-text/70 leading-relaxed line-clamp-2">
                {description}
              </p>
            </div>
          </div>
          <div className="text-2xl font-bold text-primary mb-3">
            {formattedPrice}
          </div>
        </div>

        <MenuItemAmount
          amount={amount}
          onChangeAmount={changePreCartAmountHandler}
          onAddToCart={addItemToCartHandler}
        />
      </div>
    </motion.div>
  );
});

export default MenuItem;
