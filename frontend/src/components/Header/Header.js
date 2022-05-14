import React, { useState } from "react";

import classes from "./Header.module.css";
import Navigation from "./Navigation/Navigation";
import MobileMenuToggle from "./MobileNavigation/MobileMenuToggle";

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <div style={{ width: "15%" }} />
      <div style={{ width: "35%" }} />
      <div className={classes.DesktopOnly} style={{ width: "50%" }}>
        <Navigation loggedIn={props.loggedIn} />
      </div>
      <div className={classes.MobileOnly} style={{ width: "50%" }}>
        <MobileMenuToggle openMenu={props.openMenu} />
      </div>
    </div>
  );
};

export default Header;
