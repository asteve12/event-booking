import React from "react";
import { connect } from "react-redux";
import Fonts from "react-font";
import { Collapse, Button } from "antd";

import scrollToInfo from "../../../utils/scrollToInfo";
import formatDate from "../../../utils/formatDate";
import classes from "./Reservation.module.css";
import * as actionTypes from "../../../store/actions/action";

const { Panel } = Collapse;

const Reservation = (props) => {
  return (
    <div>
      <Fonts family="Rubik">
        <div className={classes.Reservation}>
          <div className={classes.Header}>
            <div className={classes.Title}>
              <strong>{props.reservation.event.title}</strong>
            </div>

            <div  className={classes.ImageDiv}>
              <img
                className={classes.Image}
                src={props.reservation.event.imageCover}
                alt={props.reservation.event.title}
              />
            </div>
          </div>
          <div className={classes.InfoSection}>
            <div className={classes.Info}>
              <div className={classes.InfoLeft}>
                <div>Tickets:</div>
                <div>Date:</div>
                <div>Artist:</div>
                <div>Duration:</div>
                <div>Location:</div>
                <div>Price:</div>
              </div>
              <div className={classes.InfoRight}>
                <div>
                  <strong>{props.reservation.tickets}</strong>
                </div>
                <div>
                  <strong>
                    {formatDate(props.reservation.event.startDate)}
                  </strong>
                </div>
                <div>
                  <strong>{props.reservation.event.artist}</strong>
                </div>
                <div>
                  <strong>{props.reservation.event.duration} minutes</strong>
                </div>
                <div>
                  <strong>
                    {props.reservation.event.location.venue},{" "}
                    {props.reservation.event.location.city}
                  </strong>
                </div>
                <div>
                  <strong>
                    {props.reservation.tickets} x {props.reservation.price} ={" "}
                    {props.reservation.tickets * props.reservation.price}$
                  </strong>
                </div>
              </div>
            </div>
            <div className={classes.InfoActions}>
              <Button
                onClick={() => {
                  props.onEventClicked(props.reservation.event);
                  props.onDetailOpen();
                  props.onModalOpen(window.pageYOffset);
                  scrollToInfo(window.pageYOffset);
                }}
                className={classes.Button}
              >
                Check Event Details
              </Button>
            </div>
          </div>
        </div>
        <div style={{ height: "20px" }} />
      </Fonts>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventDetails,
    openDetails: state.openDetails,
    scrollY: state.scrollY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEventClicked: (eventData) =>
      dispatch({ type: actionTypes.STORE_EVENTS, eventData }),
    onDetailOpen: () => dispatch({ type: actionTypes.OPEN_DETAILS }),
    onModalOpen: (posY) =>
      dispatch({ type: actionTypes.STORE_SCROLL_POSITION, val: posY }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
