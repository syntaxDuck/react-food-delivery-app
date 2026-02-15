
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";

import { useAuth } from "../../../contexts/AuthContext";
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
import AnimatedButton from "../../ui/AnimatedButton";

interface AuthButtonsProps {
  loginStatus: boolean;
  className?: string;
  variant?: "desktop" | "mobile";
  onAuthAction?: () => void;
}

// Clean auth buttons component - works on both desktop and mobile
const AuthButtons = ({ loginStatus, className = "", variant = "desktop", onAuthAction }: AuthButtonsProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    onAuthAction?.();
    void navigate("/index");
  };

  const handleLoginClick = () => {
    onAuthAction?.();
  };

  return (
    <motion.div variants={navVariants.navItem} transition={{ delay: 0.2 }} className={className}>
      {!loginStatus ? (
        <Link to="/Login" onClick={handleLoginClick}>
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
          onClick={handleLogout}
        >
          <span className="material-icons md-18 mr-2">logout</span>
          Logout
        </AnimatedButton>
      )}
    </motion.div>
  );
};

export default AuthButtons;
