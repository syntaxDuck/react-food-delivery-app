import { motion } from "framer-motion";
import React from "react";

import { menuVariants } from "./animations";
import MenuItem from "./MenuItem";
import type { MenuGridProps } from "./types";

const MenuGrid: React.FC<MenuGridProps> = ({ 
  menuItems, 
  itemAmountsMap, 
  addToPreCartHandler 
}) => {
  if (!menuItems) return null;

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:gap-6"
      variants={menuVariants}
      initial="initial"
      animate="animate"
    >
      {Object.keys(menuItems).map((itemName, index) => {
        const menuItem = menuItems[itemName];
        const itemAmount = itemAmountsMap.get(menuItem.id) ?? 0;

        return (
          <MenuItem
            key={menuItem.id}
            id={menuItem.id}
            price={menuItem.price}
            name={itemName}
            description={menuItem.description}
            amount={itemAmount}
            onAddToPreCart={addToPreCartHandler}
            delay={index * 0.1}
          />
        );
      })}
    </motion.div>
  );
};

export default MenuGrid;
