import React from "react";

import image from "../../assets/sushi.jpg";
import CartCtxProvider from "../cart/cart-context/CartCtxProvider";
import NavigationBar from "./navigation-bar/NavigationBar";

interface LayoutProps {
  isLoggedIn: boolean,
  children: React.ReactNode
}

type ThemeMode = "light" | "dark";

const THEME_STORAGE_KEY = "chrono-theme-mode";

const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") return null;
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }
  return null;
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, children }) => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>(() => {
    const storedTheme = getStoredTheme();
    return storedTheme ?? getSystemTheme();
  });
  const [followSystemTheme, setFollowSystemTheme] = React.useState<boolean>(() => getStoredTheme() === null);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  };

  React.useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.toggle("dark", themeMode === "dark");
  }, [themeMode]);

  React.useEffect(() => {
    if (!followSystemTheme || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onThemeChange = (event: MediaQueryListEvent) => {
      setThemeMode(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", onThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", onThemeChange);
    };
  }, [followSystemTheme]);

  const toggleThemeHandler = (): void => {
    setFollowSystemTheme(false);
    setThemeMode((prevTheme) => {
      const nextTheme = prevTheme === "light" ? "dark" : "light";
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      return nextTheme;
    });
  };

  return (
    <CartCtxProvider>
      <div
        className="min-h-screen bg-no-repeat bg-center bg-contain md:bg-cover md:bg-fixed relative overflow-x-hidden"
        style={backgroundStyle}
      >
        <div className="fixed inset-0 bg-bg-dark/70 pointer-events-none" />
        <NavigationBar
          loginStatus={isLoggedIn}
          isLightTheme={themeMode === "light"}
          onToggleTheme={toggleThemeHandler}
        />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </div>
    </CartCtxProvider>
  );
};

export default Layout;
