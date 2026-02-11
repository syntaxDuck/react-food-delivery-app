export interface NavigationItem {
  id: "menu" | "location" | "about-us";
  text: string;
  icon: string;
}

// Centralized navigation items configuration
export const navigationItems: NavigationItem[] = [
  { id: "menu", text: "menu", icon: "restaurant_menu" },
  { id: "location", text: "location", icon: "location_on" },
  { id: "about-us", text: "About Us", icon: "info" },
];

// Utility function to get active item styling
export const getActiveItemClass = (isActive: boolean): string => {
  return isActive 
    ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow' 
    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent';
};

// Utility function to get mobile active item styling
export const getMobileActiveItemClass = (isActive: boolean): string => {
  return isActive 
    ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary border border-primary/40 shadow-glow-glass' 
    : 'text-white/80 hover:text-white hover:bg-white/10 border border-white/20';
};

// Utility function to handle navigation click
export const handleNavigationClick = (
  menuElement: NavigationItem,
  setActiveSection: (section: NavigationItem["id"]) => void,
  toggleMobileMenu?: () => void
): void => {
  setActiveSection(menuElement.id);
  
  // Handle smooth scroll to section
  if (menuElement.id !== 'about-us') {
    const element = document.getElementById(menuElement.id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Close mobile menu if open
  if (toggleMobileMenu) {
    toggleMobileMenu();
  }
};
