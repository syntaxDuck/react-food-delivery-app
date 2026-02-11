import { motion } from "framer-motion";

import Section from "../Section";
import { useMenuData } from "./hooks/useMenuData";
import { usePreCart } from "./hooks/usePreCart";
import MenuDisplay from "./MenuDisplay";

const Menu = () => {
  const { menuItems, loading, error } = useMenuData();
  const {
    itemAmountsMap,
    addToPreCartHandler,
    updateCartHandler,
    clearPreCart
  } = usePreCart();

  return (
    <Section 
      id="menu" 
      className="" 
      background="transparent" 
      padding="comfortable" 
      spacing="normal" 
      container={true}
    >
      <motion.div
        className="content-hero"
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

      <MenuDisplay
        menuItems={menuItems}
        loading={loading}
        error={error}
        itemAmountsMap={itemAmountsMap}
        addToPreCartHandler={addToPreCartHandler}
        updateCartHandler={updateCartHandler}
        clearPreCart={clearPreCart}
      />
    </Section>
  );
};

export default Menu;
