import React, { Fragment } from "react";

import NavigationBar from "./navigation_bar/NavigationBar";
import image from "../../assets/sushi.jpg";

const Layout = (props: any) => {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    zIndex: -10
  };

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: -1
  };

  return (
    <Fragment>
      <NavigationBar loginStatus={props.loginStatus} />
      <div style={backgroundStyle}>
        <div style={overlayStyle} />
        <main>
          {props.children}
        </main>
      </div>
    </Fragment>
  );
};

export default Layout;
