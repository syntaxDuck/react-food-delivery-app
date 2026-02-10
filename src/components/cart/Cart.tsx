import React from "react";
import { motion, AnimatePresence } from "framer-motion";

//Component Imports
import AnimatedModal from "../ui/AnimatedModal";
import AnimatedButton from "../ui/AnimatedButton";
import CartItem from "./CartItem";
import { useCart } from "./cart_context/CartCtxProvider";

import { FIREBASE_ENDPOINT } from "../../App";

const cartItemVariants = {
  initial: { opacity: 0, x: 50, scale: 0.8 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

const Cart = () => {
  const crtCtx = useCart();
  const [error, setError] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const dbUrl = React.useRef(FIREBASE_ENDPOINT + "Orders.json");

  const submitOrderHandler = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(dbUrl.current, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(crtCtx.items),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: Status ${response.status}`);
      }

      setError(null);
      crtCtx.clearCart();
      crtCtx.toggleCart();

      // Show success feedback
      setTimeout(() => {
        alert('Order submitted successfully! 🎉');
      }, 500);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearCartHandler = () => {
    crtCtx.clearCart();
    crtCtx.toggleCart();
  };

  if (error) {
    console.error("Cart Error:", error);
  }

  let cartContent;
  if (crtCtx.items.length === 0) {
    cartContent = (
      <motion.div
        className="flex flex-col items-center justify-center h-64 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="text-6xl mb-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="material-icons md-96 text-primary">shopping_cart</span>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
        <p className="text-white/60">Add some delicious items to get started!</p>
      </motion.div>
    );
  } else {
    cartContent = (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <motion.h2
            className="text-2xl font-bold text-white"
            key={crtCtx.totalAmount}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Total: ${crtCtx.totalAmount.toFixed(2)}
          </motion.h2>
          <div className="flex space-x-3">
            <AnimatedButton
              variant="outline"
              size="sm"
              onClick={clearCartHandler}
            >
              Clear
            </AnimatedButton>
            <AnimatedButton
              variant="default"
              size="sm"
              onClick={submitOrderHandler}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="material-icons md-18 mr-2"
                  >
                    loop
                  </motion.span>
                  Processing...
                </span>
              ) : (
                <>
                  <span className="material-icons md-18 mr-2">check_circle</span>
                  Submit Order
                </>
              )}
            </AnimatedButton>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
          <AnimatePresence mode="popLayout">
            {crtCtx.items.map((item) => (
              <motion.div
                key={item.id}
                variants={cartItemVariants}
                layout
                initial="initial"
                animate="animate"
                exit="exit"
                className="mb-4 last:mb-0"
              >
                <CartItem
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  itemAmountInCart={item.amount}
                  onUpdateCartItem={crtCtx.updateCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <AnimatedModal
      isOpen={crtCtx.cartActive}
      onClose={crtCtx.toggleCart}
      size="lg"
      className="bg-dark-gray border-primary/30"
    >
      {cartContent}
    </AnimatedModal>
  );
};

export default Cart;
