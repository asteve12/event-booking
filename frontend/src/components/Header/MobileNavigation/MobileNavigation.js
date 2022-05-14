import React from "react";

import classes from "./MobileNavigation.module.css";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import scrollOnClose from "../../../utils/scrollOnClose";
import Navigation from "../Navigation/Navigation";

const MobileNavigation = (props) => {
  let attachedClasses = [classes.MobileNav, classes.Close];
  if (props.show) {
    attachedClasses = [classes.MobileNav, classes.Open];
  }

  return (
    <div>
      <Backdrop
        show={props.show}
        clicked={props.closeMenu}
        scrollOnClose={scrollOnClose}
      />
      <div className={attachedClasses.join(" ")}>
        <Navigation
          onMobile={true}
          clicked={props.closeMenu}
          loggedIn={props.loggedIn}
        />
      </div>
    </div>
  );
};

export default MobileNavigation;
