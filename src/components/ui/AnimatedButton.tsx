import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";


const buttonVariants: Variants = {
  enabled: {
    opacity: 1,
    cursor: "pointer"
  },
  hover: {
    scale: 1.02,  // Reduced from 1.05
    transition: { type: "spring", stiffness: 300, damping: 20 }  // Softer
  },
  tap: {
    scale: 0.98,  // Reduced from 0.95
    transition: { type: "spring", stiffness: 400, damping: 20 }
  },
  disabled: {
    opacity: 0.6,
    cursor: "not-allowed"
  }
};


const SizeClasses = {
  xs: "px-2 py-1 text-xs min-w-[40px]",
  sm: "px-3 py-1.5 text-sm min-w-[60px]",
  md: "px-4 py-2 text-base min-w-[80px]",
  lg: "px-6 py-3 text-lg min-w-[120px]",
  xl: "px-8 py-4 text-xl min-w-[160px]"
} as const;
type SizeClassTypes = keyof typeof SizeClasses;

const VariantClasses = {
  default: "bg-primary hover:bg-primary/90 text-text border border-primary focus:ring-primary",
  secondary: "bg-secondary hover:bg-secondary/90 text-bg-dark border border-secondary focus:ring-secondary",
  outline: "bg-transparent hover:bg-primary/10 text-primary border border-primary focus:ring-primary",
  ghost: "bg-transparent hover:bg-bg-light/30 text-text border border-transparent focus:ring-border"
} as const;
type VariantClassTypes = keyof typeof VariantClasses;

interface AnimatedButtonProps {
  href?: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement | HTMLFormElement>;
  disabled?: boolean;
  label?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  variant?: VariantClassTypes;
  size?: SizeClassTypes;
  children?: ReactNode;
}

const AnimatedButton = ({
  href,
  className = "",
  onClick,
  disabled = false,
  label,
  type = "button",
  variant = "default",
  size = "md",
  children
}: AnimatedButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-gray";

  const classes = `${baseClasses} ${VariantClasses[variant]} ${SizeClasses[size]} ${className}`;

  const buttonContent = (
    <>
      <span className="material-icons md-18 mr-2">
        {label?.includes('Cart') ? 'shopping_cart' :
          label?.includes('Clear') ? 'clear' :
            label?.includes('Login') ? 'login' : 'arrow_forward'}
      </span>
      {label}
    </>
  );

  if (href && !disabled) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        {children ?? buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      whileHover={!disabled ? "hover" : undefined}
      whileTap={!disabled ? "tap" : undefined}
      animate={disabled ? "disabled" : "enabled"}
    >
      {children ?? buttonContent}
    </motion.button>
  );
};

export default AnimatedButton;
