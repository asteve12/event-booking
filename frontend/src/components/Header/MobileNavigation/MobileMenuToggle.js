import React from "react";

import {FaBars} from "react-icons/fa"

import classes from "./MobileNavigation.module.css";

const MobileMenuToggle = (props) => {
  return (
    <div className={classes.MobileMenuToggle}>
      <FaBars onClick={props.openMenu} style={{fontSize: "40px"}}/>
    </div>
  );
};

export default MobileMenuToggle;
