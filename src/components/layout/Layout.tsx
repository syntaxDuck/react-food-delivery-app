import React from "react";

import image from "../../assets/sushi.jpg";
import CartCtxProvider from "../cart/cart-context/CartCtxProvider";
import NavigationBar from "./navigation-bar/NavigationBar";

interface LayoutProps {
  isLoggedIn: boolean,
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, children }) => {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${image})`,
  };

  return (
    <CartCtxProvider>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed relative overflow-x-hidden"
        style={backgroundStyle}
      >
        <div className="fixed inset-0 bg-black/70 pointer-events-none" />
        <NavigationBar loginStatus={isLoggedIn} />
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </div>
    </CartCtxProvider>
  );
};

export default Layout;
