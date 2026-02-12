import { motion } from "framer-motion";
import React from "react";

import { menuVariants } from "./animations";
import MenuItem from "./MenuItem";
import type { MenuGridProps } from "./types";

const MenuGrid: React.FC<MenuGridProps> = ({
  menuItems,
  itemAmountsMap,
  addToPreCartHandler,
  addItemToCartHandler
}) => {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:gap-6 items-stretch"
      variants={menuVariants}
      initial="initial"
      animate="animate"
    >
      {menuItems.map((menuItem, index) => {
        const itemAmount = itemAmountsMap.get(menuItem.id) ?? 0;

        return (
          <MenuItem
            key={menuItem.id}
            id={menuItem.id}
            price={menuItem.price}
            name={menuItem.name}
            description={menuItem.description}
            amount={itemAmount}
            onChangePreCartAmount={addToPreCartHandler}
            onAddItemToCart={addItemToCartHandler}
            delay={index * 0.1}
          />
        );
      })}
    </motion.div>
  );
};

export default MenuGrid;
