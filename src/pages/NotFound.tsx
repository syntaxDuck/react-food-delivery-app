import { motion } from "framer-motion";
import { Link } from "react-router";

import AnimatedButton from "../components/ui/AnimatedButton";
import MotionContainer from "../components/ui/MotionContainer";

const NotFound = () => {
  return (
    <MotionContainer className="flex items-center justify-center px-6 py-16">
      <motion.div
        className="max-w-lg text-center surface-muted rounded-2xl p-10 backdrop-blur"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.h1
          className="text-5xl font-bold text-text mb-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          404: Page Not Found
        </motion.h1>
        <p className="text-text/70 text-lg mb-8">
          The route you requested doesn&apos;t exist. Let&apos;s get you back to the menu.
        </p>
        <Link to="/index">
          <AnimatedButton variant="default" size="lg">
            Back to Home
          </AnimatedButton>
        </Link>
      </motion.div>
    </MotionContainer>
  );
};

export default NotFound;
