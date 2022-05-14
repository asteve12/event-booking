import React from "react";
import { FaTicketAlt } from "react-icons/fa";

import formatDate from "../../../utils/formatDate";
import classes from "../Reservations.module.css";

const ReservationHeader = (props) => {
  return (
    <div className={classes.ReservationHeader}>
      <div style={{width:"50%"}}>{props.title}</div>
      <div style={{width:"30%"}}>{formatDate(props.startDate)}</div>
      <div className={classes.ReservationHeaderTicket}>
        {props.tickets} x <FaTicketAlt style={{ fontSize: "30px" }} />
      </div>
    </div>
  );
};

export default ReservationHeader;
