
import { Link } from "react-router";
import { motion } from "framer-motion";
// Inline variants since NavigationVariants.js doesn't exist
const navVariants = {
  navItem: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.02, x: 2 },
    active: { scale: 1.02 }
  }
};

// Component imports
import AnimatedButton from "../../UI/AnimatedButton";

interface AuthButtonsProps {
  loginStatus: boolean;
  className?: string;
  variant?: "desktop" | "mobile";
}

// Clean auth buttons component - works on both desktop and mobile
const AuthButtons = ({ loginStatus, className = "", variant = "desktop" }: AuthButtonsProps) => {
  return (
    <motion.div variants={navVariants.navItem} transition={{ delay: 0.2 }} className={className}>
      {!loginStatus ? (
        <Link to="/Login">
          <AnimatedButton 
            variant="secondary" 
            size={variant === "mobile" ? "lg" : "sm"} 
            className={variant === "mobile" ? "w-full" : "ml-2"}
          >
            <span className="material-icons md-18 mr-2">login</span>
            Login
          </AnimatedButton>
        </Link>
      ) : (
        <AnimatedButton
          variant="outline"
          size={variant === "mobile" ? "lg" : "sm"}
          className={variant === "mobile" ? "w-full" : "ml-2"}
          onClick={() => window.location.reload()}
        >
          <span className="material-icons md-18 mr-2">logout</span>
          Logout
        </AnimatedButton>
      )}
    </motion.div>
  );
};

export default AuthButtons;
