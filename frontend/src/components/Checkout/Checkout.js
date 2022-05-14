import React, { useState } from "react";
import Fonts from "react-font";
import { connect } from "react-redux";

import { InputNumber, Button, message } from "antd";
import classes from "./Checkout.module.css";
import formatDate from "../../utils/formatDate";

const Checkout = (props) => {
  const [tickets, setTickets] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const changeTicketsHandler = (value) => {
    setTickets(tickets + 1);
    setTotalPrice(value * props.eventDetails.price);
  };

  const createRes = (eventID) => {
    if(tickets < 1) {
      message.warning("You need to buy at least 1 ticket to complete purchase!");
    } else {
      props.createReservation(eventID, tickets)
    }

  }

  console.log(props.eventDetails);
  return (
    <div className={classes.Checkout}>
      <div style={{ height: "80px" }}>
        <Fonts family="Rubik">
          <span style={{ fontSize: "20px" }}>{props.eventDetails.title}</span>
        </Fonts>
      </div>

      <div className={classes.EventInfo}>
        <Fonts family="Rubik">
          <span>{props.eventDetails.artist}</span>
        </Fonts>

        <Fonts family="Rubik">
          <span>{formatDate(props.eventDetails.startDate)}, </span>
          <span>{props.eventDetails.duration} minutes</span>
        </Fonts>
        <Fonts family="Rubik">
          <span>{props.eventDetails.location.venue}, </span>
          <span>{props.eventDetails.location.city}</span>
        </Fonts>
        <Fonts family="Rubik">
          <span>{props.eventDetails.maxPeople} people max</span>
        </Fonts>
        <Fonts family="Rubik">
          <span>{props.eventDetails.seatsLeft} seats left</span>
        </Fonts>
        <Fonts family="Rubik">
          <span>{props.eventDetails.price}$ per ticket</span>
        </Fonts>
      </div>
      <div className={classes.ButtonDiv}>
        <InputNumber onChange={changeTicketsHandler} />{" "}
        <span>&nbsp; tickets</span>
      </div>
      <div style={{ height: "30px" }}>
        <Fonts family="Rubik">
          <span style={{ fontSize: "16px" }}>Total Price: {totalPrice}$</span>
        </Fonts>
      </div>
      <div className={classes.TotalPrice}>
        <Button
          onClick={() => createRes(props.eventDetails._id)}
          style={{ height: "50px", fontSize: "16px" }}
          type="primary"
        >
          Buy and Reserve Tickets
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventDetails,
  };
};

export default connect(mapStateToProps)(Checkout);
