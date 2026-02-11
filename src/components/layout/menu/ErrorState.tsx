import React from "react";
import { motion } from "framer-motion";

const ErrorState: React.FC = () => {
  return (
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
};

export default ErrorState;