import React, { useCallback, useMemo, type SubmitEventHandler } from "react";
import { motion, type Variants } from "framer-motion";
import Card from "../../ui/Card";
import AnimatedButton from "../../ui/AnimatedButton";
import LoadingSpinner from "../../ui/LoadingSpinner";

import MenuItem from "./MenuItem";
import Section from "../Section";
import { compoundClasses } from "../../../utils/compoundClasses";

//Functional Imports
import { useCart } from "../../cart/cart_context/CartCtxProvider";
import useFetch from "../../../functions/useFetch";

import { FIREBASE_ENDPOINT } from "../../../App";
import type { CartItemType } from "../../cart/cart_types";

type MenuItemType = {
  id: string,
  price: number
  description: string,
}

// Move static objects outside component to prevent recreation
const menuVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
      delay: 0.6
    }
  }
};

const cartInteractionStyles = `flex flex-col sm:flex-row justify-center items-center space-y-4 
  sm:space-y-0 sm:space-x-6 p-8 border-t border-white/20 mt-8`;

const Menu = () => {
  const updateCart = useCart().updateCart;
  const [preCart, setPreCart] = React.useState<CartItemType[]>([]);

  const dbUrl = React.useRef(FIREBASE_ENDPOINT + "Menu.json");

  const { data, error, loading } = useFetch(dbUrl.current);
  const menuItems = data as { [key: string]: MenuItemType; };

  // Memoize cart item lookup for O(1) performance
  const itemAmountsMap = useMemo(() => {
    const map = new Map<string, number>();
    preCart.forEach(item => {
      map.set(item.id, item.amount);
    });
    return map;
  }, [preCart]);

  const addToPreCartHandler = useCallback((newItem: CartItemType) => {
    setPreCart((prevState) => {
      const existingCartItemIndex = prevState.findIndex(
        (item: CartItemType) => item.id === newItem.id
      );

      if (existingCartItemIndex >= 0) {
        const newState = prevState.filter((item: CartItemType) => item.id !== newItem.id);

        if (newItem.amount === 0) {
          return newState;
        }
        return [...newState, newItem];
      } else {
        return [...prevState, newItem];
      }
    });
  }, []);

  const updateCartHandler = useCallback<SubmitEventHandler>((event) => {
    event.preventDefault();
    if (preCart.length !== 0) {
      setPreCart([]);
      updateCart(preCart);
    }
  }, [preCart, updateCart]);

  // Memoize menu items to prevent recreation
  const menuItemsElements = useMemo(() => {
    if (!menuItems) return [];
    
    return Object.keys(menuItems).map((itemName, index) => {
      const menuItem: MenuItemType = menuItems[itemName];
      const itemAmount = itemAmountsMap.get(menuItem.id) || 0;

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
    });
  }, [menuItems, itemAmountsMap, addToPreCartHandler]);

  if (error) {
    console.error("Menu Error:", error);
  }

  let menuContent;
  if (loading) {
    menuContent = (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" color="primary" />
      </div>
    );
  } else if (data) {
    menuContent = (
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        variants={menuVariants}
        initial="initial"
        animate="animate"
      >
        {menuItemsElements}
      </motion.div>
    );
  } else if (error) {
    menuContent = (
      <div className="text-center py-12">
        <motion.div
          className="text-6xl mb-4 text-red-400"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="material-icons md-96">error</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Unable to load menu</h3>
        <p className="text-white/60">Please try again later</p>
      </div>
    );
  }

  // Memoize buttons to prevent recreation
  const addToCartButton = useMemo(() => (
    <AnimatedButton
      type="submit"
      variant="default"
      size="lg"
      disabled={preCart.length === 0}
      className={!preCart.length ? "opacity-50 cursor-not-allowed" : ""}
    >
      <span className="material-icons md-20 mr-3">add_shopping_cart</span>
      Add to Cart
      {preCart.length > 0 && (
        <motion.span
          className="ml-3 bg-white/20 px-3 py-1 rounded-full text-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {preCart.length}
        </motion.span>
      )}
    </AnimatedButton>
  ), [preCart.length]);

  const clearCartButton = useMemo(() => (
    <AnimatedButton
      type="button"
      variant="outline"
      size="lg"
      onClick={() => setPreCart([])}
      disabled={preCart.length === 0}
    >
      <span className="material-icons md-20 mr-3">clear</span>
      Clear Selection
    </AnimatedButton>
  ), [preCart.length]);

  return (
    <Section id="menu" padding="comfortable" spacing="normal">
      <motion.div
        className={compoundClasses.content.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Our <span className="text-primary">Delicious Menu</span>
        </h2>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Choose from our carefully selected local restaurants. Quality food, delivered any time!
        </p>
      </motion.div>

      <Card className="mb-12 p-8">
        <form onSubmit={updateCartHandler}>
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
          >
            {menuContent}
          </motion.div>

          <div className={cartInteractionStyles}>
            {addToCartButton}
            {clearCartButton}
          </div>
        </form>
      </Card>
    </Section>
  );
};

export default React.memo(Menu);