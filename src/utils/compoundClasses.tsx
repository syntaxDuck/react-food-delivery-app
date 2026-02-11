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
    header: 'sticky top-0 z-40 relative bg-gradient-to-r from-gray-900/90 via-gray-800/85 to-gray-900/90 backdrop-blur-md border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.35)]',
    container: 'container mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4 relative z-mobile-content',
    logo: 'flex items-center space-x-3 group cursor-pointer px-3 py-2 rounded-xl bg-white/5 border border-white/10 shadow-sm',
    desktop: 'flex items-center gap-2 lg:gap-4',
    mobile: 'md:hidden',
    item: 'px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/90',
    // Enhanced mobile classes with fixed positioning and glass effects
    mobileMenu: 'fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-dark-gray to-dark-gray backdrop-blur-glass border-l border-white shadow-glass-lg z-mobile-menu md:hidden',
    mobileBackdrop: 'fixed inset-0 bg-black/50 backdrop-blur-sm z-mobile-backdrop md:hidden',
    // Enhanced z-index utilities
    zIndex: {
      'mobile-menu': '60',
      'mobile-backdrop': '50',
      'mobile-content': '40'
    }
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
