// Compound utility classes for consistent styling patterns
export const compoundClasses = {
  // Section spacing classes
  section: {
    padding: {
      cozy: 'py-16',
      comfortable: 'py-20',    // NEW DEFAULT
      spacious: 'py-24',
      luxurious: 'py-28',
    },
    spacing: {
      none: '',
      tight: 'mb-8',
      normal: 'mb-16',
      relaxed: 'mb-20',
      loose: 'mb-24',
    },
    container: 'container mx-auto px-4 sm:px-6 lg:px-8',
  },

  // Navigation compound classes  
  navigation: {
    header: 'top-0 z-40 w-full theme-gradient-hero backdrop-blur-md border-b border-border/40 shadow-2xl',
    container: 'w-full mx-2 px-4 px-1 py-3 md:py-4 relative z-60',
    logo: 'flex items-center space-x-3 group cursor-pointer px-3 py-2',
    desktop: 'flex items-center gap-2 lg:gap-4',
    mobile: 'lg:hidden',
    item: 'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center bg-bg-light/20 hover:bg-bg-light/30 border border-border/40 hover:border-border/60 text-text/90',
    mobileMenu: 'fixed top-0 right-0 w-80 surface-glass shadow-2xl z-50 rounded-bl-xl lg:hidden',
    mobileBackdrop: 'fixed inset-0 bg-bg-dark/50 backdrop-blur-sm z-40 lg:hidden',
  },

  // Content compound classes
  content: {
    hero: 'text-center mb-16 sm:mb-20',
    section: 'mb-12 sm:mb-16',
    card: 'p-6 sm:p-8 space-y-4',
    grid: {
      responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      spaced: 'gap-6 sm:gap-8 lg:gap-10',
    },
    // Enhanced chrono brand sections
    chrono: {
      hero: 'text-center mb-16 sm:mb-20',
      section: 'mb-12 sm:mb-16',
      card: 'p-6 sm:p-8 space-y-4',
      grid: {
        responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        spaced: 'gap-6 sm:gap-8 lg:gap-10',
      },
    }
  },

  // Animation compound classes
  animation: {
    subtle: 'transition-all duration-300 ease-out',
    interactive: 'transition-all duration-200 ease-in-out',
    delayed: 'transition-all duration-500 ease-out',
  }
};
