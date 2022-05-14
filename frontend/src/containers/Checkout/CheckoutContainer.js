import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import classes from "./CheckoutContainer.module.css";
import Checkout from "../../components/Checkout/Checkout";
import services from "../../apiService/services";
import * as actionTypes from "../../store/actions/action";

const CheckoutContainer = (props) => {
  const history = useHistory();

  const createReservation = async (eventID, tickets) => {
    const url = "/reservations/create-rez/" + eventID;
    console.log(url);
    const payload = {
      tickets,
    };
    try {
      const res = await services.post(url, payload);
      props.onDetailOpen();
      history.push("/profile");
      message.success("Your purchase of " + tickets + " tickets is completed!");
    } catch (err) {
      message.error("Cannot complete purchase!");
    }
  };

  return (
    <div className={classes.CheckoutContainer}>
      <Checkout createReservation={createReservation} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    openDetails: state.openDetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDetailOpen: () => dispatch({ type: actionTypes.OPEN_DETAILS }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
