import { motion } from "framer-motion";
import React from "react";

import AnimatedButton from "../../ui/AnimatedButton";
import type { MenuActionsProps } from "./types";

const MenuActions: React.FC<MenuActionsProps> = ({
  itemCount,
  isSubmittingToCart,
  onAddToCart,
  onClearCart
}) => {
  const isSubmitDisabled = itemCount === 0 || isSubmittingToCart;

  return (
    <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 
      sm:space-y-0 sm:space-x-6 p-8 border-t border-border/60 mt-8`}>
      <AnimatedButton
        type="submit"
        variant="default"
        size="lg"
        disabled={isSubmitDisabled}
        className={isSubmitDisabled ? "opacity-50 cursor-not-allowed" : ""}
        onClick={onAddToCart}
      >
        <span className="material-icons md-20 mr-3">add_shopping_cart</span>
        Add to Cart
        {itemCount > 0 && (
          <motion.span
            className="ml-3 bg-bg-light/40 px-3 py-1 rounded-full text-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatedButton>

      <AnimatedButton
        type="button"
        variant="outline"
        size="lg"
        onClick={onClearCart}
        disabled={itemCount === 0}
      >
        <span className="material-icons md-20 mr-3">clear</span>
        Clear Selection
      </AnimatedButton>
    </div>
  );
};

export default MenuActions;
