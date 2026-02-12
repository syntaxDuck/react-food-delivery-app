import { motion, type Variants } from "framer-motion";

const dotVariants: Variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 }
};

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const sizeClasses = {
  sm: "w-2 h-2",
  md: "w-3 h-3",
  lg: "w-4 h-4"
} as const;

const colorClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  white: "bg-text"
} as const;

type SpinnerSize = keyof typeof sizeClasses;
type SpinnerColor = keyof typeof colorClasses;

interface LoadingSpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const LoadingSpinner = ({ size = "md", color = "primary" }: LoadingSpinnerProps) => {

  return (
    <motion.div
      className="flex items-center justify-center space-x-2"
      role="status"
      aria-label="Loading"
      variants={containerVariants}
      animate="animate"
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
            delay: i * 0.2
          }}
        />
      ))}
    </motion.div>
  );
};

export default LoadingSpinner;
