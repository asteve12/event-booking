import React from "react";

import classes from "./Events.module.css";
import Event from "./Event/Event";

const Events = (props) => {
  let events = props.events
    ? props.events.map((event, id) => <Event event={event} key={id} />)
    : null;

  let style = {};
  if (events) {
    if (events.length === 2) {
      style = { gridTemplateColumns: "1fr 1fr" };
    } else if (events.length === 1) {
      style = { gridTemplateColumns: "1fr" };
    }
  }

  return <div style={style} className={classes.Events}>{events}</div>;
};

export default Events;
