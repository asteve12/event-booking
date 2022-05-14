import React from "react";
import { connect } from "react-redux";

import classes from "./Backdrop.module.css";

const backdrop = (props) => {
  const style = props.zIndex ? { zIndex: props.zIndex } : null;
  return props.show ? (
    <div
      style={style}
      className={classes.Backdrop}
      onClick={() => {
        props.scrollOnClose(props.scrollY);
        props.clicked();
      }}
    />
  ) : null;
};

export default backdrop;
