import { motion } from "framer-motion";
import React from "react";

import Section from "../Section";
import { compoundClasses } from "../../../utils/compoundClasses";
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(menuItems.length / itemsPerPage));
  const pagedItems = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return menuItems.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, menuItems]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

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

      <MenuDisplay
        menuItems={pagedItems}
        loading={loading}
        error={error}
        itemAmountsMap={itemAmountsMap}
        addToPreCartHandler={addToPreCartHandler}
        updateCartHandler={updateCartHandler}
        clearPreCart={clearPreCart}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Section>
  );
};

export default Menu;
