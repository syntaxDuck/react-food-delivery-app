import React from "react";

import NavigationBar from "./navigation-bar/NavigationBar";
import CartCtxProvider from "../cart/cart-context/CartCtxProvider";
import image from "../../assets/sushi.jpg";

interface LayoutProps {
  isLoggedIn: boolean,
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn, children }) => {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  };

  const mainStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    height: "100vh",
    width: "100vw",
    overflow: "scroll"
  }

  return (
    <CartCtxProvider>
      <NavigationBar loginStatus={isLoggedIn} />
      <div style={backgroundStyle}>
        <div style={overlayStyle} />
      </div>
      <main style={mainStyle}>
        {children}
      </main>
    </CartCtxProvider>
  );
};

export default Layout;
