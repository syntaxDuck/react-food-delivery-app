import { motion, type Variants } from "framer-motion";
import React, { useMemo } from "react";

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
    boxShadow: "0 20px 25px -5px rgba(214, 110, 110, 0.3), 0 10px 10px -5px rgba(214, 110, 110, 0.2)",
    transition: { type: "spring", stiffness: 400, damping: 15 }
  }
};

interface MenuItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  amount: number;
  onChangePreCartAmount: (item: { id: string; name: string; price: number; amount: number }) => void;
  onAddItemToCart: (item: { id: string; name: string; price: number; amount: number }) => void;
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
        <div className="flex justify-between items-start mb-4 flex-1">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors truncate">
              {name}
            </h3>
            <div className="text-2xl font-bold text-primary mb-3">
              {formattedPrice}
            </div>
            <p className="text-white/70 leading-relaxed truncate">
              {description}
            </p>
          </div>
          <div className="ml-4">
            <div className="w-20 h-20 surface-panel rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="material-icons md-36 text-primary">restaurant</span>
            </div>
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
