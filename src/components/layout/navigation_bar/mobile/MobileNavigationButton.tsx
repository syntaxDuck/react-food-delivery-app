import { motion } from "framer-motion";
import { compoundClasses } from "../../../../utils/compoundClasses";
// useNavigation not available since NavigationContext.js doesn't exist
// Using props instead
import AnimatedButton from "../../../ui/AnimatedButton";

interface MobileNavigationButtonProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const MobileNavigationButton = ({ mobileMenuOpen, setMobileMenuOpen }: MobileNavigationButtonProps) => {

  return (
    <div className={compoundClasses.navigation.mobile}>
      <AnimatedButton
        variant="ghost"
        size="sm"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2"
      >
        <motion.span
          className="material-icons md-24"
          animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {mobileMenuOpen ? "close" : "menu"}
        </motion.span>
      </AnimatedButton>
    </div>
  );
};

export default MobileNavigationButton;
