import { motion } from "framer-motion";
import React from "react";

import Card from "../../ui/Card";
import { menuVariants } from "./animations";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";
import MenuActions from "./MenuActions";
import MenuGrid from "./MenuGrid";
import type { MenuDisplayProps } from "./types";

const MenuDisplay: React.FC<MenuDisplayProps> = ({
  menuItems,
  loading,
  error,
  itemAmountsMap,
  addToPreCartHandler,
  updateCartHandler,
  clearPreCart
}) => {
  let menuContent;
  if (loading) {
    menuContent = <LoadingState />;
  } else if (menuItems) {
    menuContent = (
      <MenuGrid
        menuItems={menuItems}
        itemAmountsMap={itemAmountsMap}
        addToPreCartHandler={addToPreCartHandler}
      />
    );
  } else if (error) {
    menuContent = <ErrorState />;
  }

  return (
    <Card className="mb-12 p-8">
      <form onSubmit={updateCartHandler}>
        <motion.div
          variants={menuVariants}
          initial="initial"
          animate="animate"
        >
          {menuContent}
        </motion.div>

        <MenuActions
          itemCount={itemAmountsMap.size}
          onAddToCart={updateCartHandler}
          onClearCart={clearPreCart}
        />
      </form>
    </Card>
  );
};

export default MenuDisplay;