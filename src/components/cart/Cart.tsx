import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase/config";
import AnimatedButton from "../ui/AnimatedButton";
import AnimatedModal from "../ui/AnimatedModal";
import { useCart } from "./cart-context/CartContext";
import CartItem from "./CartItem";
import type { CartItemType } from "./CartTypes";

const cartItemVariants: Variants = {
  initial: { opacity: 0, x: 50, scale: 0.8 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 }
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

const Cart: React.FC = () => {
  const { user, isAuthenticated, signInAnonymous } = useAuth();
  const crtCtx = useCart();
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!crtCtx.state.cartActive) {
      setError(null);
      setSuccessMessage(null);
    }
  }, [crtCtx.state.cartActive]);

  const submitOrderHandler = async (): Promise<void> => {
    if (isSubmitting) return;

    if (!isAuthenticated) {
      await signInAnonymous();
    }

    if (!user) {
      setError("Please sign in to place an order");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage(null);
    try {
      const ordersRef = collection(db, "Orders");
      await addDoc(ordersRef, {
        user_id: user.uid,
        items: crtCtx.state.items,
        created_at: serverTimestamp(),
        status: "pending"
      });

      setError(null);
      crtCtx.clearCart();
      setSuccessMessage("Order submitted successfully! We'll get your delivery on the way.");

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setSuccessMessage(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAmount = (updatedItem: CartItemType): void => {
    const updatedCartItems: CartItemType[] = [...crtCtx.state.items];
    const itemIndex = updatedCartItems.findIndex((item) => item.id == updatedItem.id)
    updatedCartItems[itemIndex] = updatedItem;
    crtCtx.updateCart(updatedCartItems);
  };

  const clearCartHandler = (): void => {
    crtCtx.clearCart();
    crtCtx.toggleCart();
  };

  let cartContent: React.ReactElement;
  if (successMessage) {
    cartContent = (
      <motion.div
        className="flex flex-col items-center justify-center h-80 text-center p-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          className="text-7xl mb-6 text-success"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          <span className="material-icons md-96">check_circle</span>
        </motion.div>
        <h3 className="text-3xl font-bold text-text mb-4">Order Received!</h3>
        <p className="text-text/70 text-lg mb-8 max-w-md">
          {successMessage}
        </p>
        <AnimatedButton
          variant="default"
          size="lg"
          onClick={crtCtx.toggleCart}
        >
          Great, thanks!
        </AnimatedButton>
      </motion.div>
    );
  } else if (crtCtx.state.items.length === 0) {
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
        <h3 className="text-2xl font-bold text-text mb-2">Your cart is empty</h3>
        <p className="text-text/60 mb-6">Add some delicious items to get started!</p>
        <AnimatedButton
          variant="outline"
          size="md"
          onClick={crtCtx.toggleCart}
        >
          Start Shopping
        </AnimatedButton>
      </motion.div>
    );
  } else {
    cartContent = (
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-6 border-b border-border/60">
          <motion.h2
            className="text-2xl font-bold text-text"
            key={crtCtx.state.totalAmount}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" as const, stiffness: 400 }}
          >
            Total: ${crtCtx.state.totalAmount.toFixed(2)}
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
              onClick={() => {
                void submitOrderHandler();
              }}
              disabled={isSubmitting}
              href={""}
              label={""}
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
            {crtCtx.state.items.map((item) => (
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
                  item={item}
                  onUpdateAmount={handleUpdateAmount}
                  onRemove={() => {
                    crtCtx.toggleCart();
                  }}
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
      isOpen={crtCtx.state.cartActive}
      onClose={crtCtx.toggleCart}
      size="lg"
      className="bg-dark-gray border-border/70"
    >
      <div className="space-y-4">
        {error && (
          <div
            className="rounded-lg border border-danger/70 bg-danger/15 px-4 py-3 text-sm text-danger"
            role="alert"
          >
            {error}
          </div>
        )}
        {cartContent}
      </div>
    </AnimatedModal>
  );
};

export default Cart;
