import React from "react";
import { motion } from "framer-motion";
import Card from "../../UI/Card";
import MenuActions from "./MenuActions";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import MenuGrid from "./MenuGrid";
import { menuVariants } from "./animations";
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