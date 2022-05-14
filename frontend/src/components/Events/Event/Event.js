import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import Fonts from "react-font";

import scrollToInfo from "../../../utils/scrollToInfo";
import classes from "./Event.module.css";
import * as actionTypes from "../../../store/actions/action";

const Event = (props) => {
  let event = props.event ? props.event : null;

  return (
    <div className={classes.EventBox}>
      <div className={classes.Event}>
        <div className={classes.ImageDiv}>
          <img
            className={classes.Image}
            src={event.imageCover}
            alt={event.title}

          />
        </div>
        {/*<div style={{ height: "4px", width: "100%" }} />*/}
        <Fonts family="Rubik">
          <div>
            <div
              style={{ height: "18%", paddingRight: "4px", paddingLeft: "4px" }}
            >
              <h3>
                <strong style={{ color: "white" }}>{event.title}</strong>
              </h3>
              <span style={{ fontSize: "12px" }}>{event.description}</span>
            </div>
            <div style={{ height: "20px", width: "80%" }} />

            <div style={{ display: "grid", height: "66px" }}>
              <div className={classes.Info}>
                <span style={{ textAlign: "center" }}>1 Person: &nbsp;</span>
                <span className={classes.InfoPrg}>{event.price} $</span>
              </div>
              <div className={classes.Info}>
                <span style={{ textAlign: "center" }}>
                  Max. Capacity: &nbsp;
                </span>
                <span className={classes.InfoPrg}>
                  {event.maxPeople} people
                </span>
              </div>
              <div className={classes.Info}>
                <span style={{ textAlign: "center" }}>Seats left: &nbsp;</span>
                <span className={classes.InfoPrg}>{event.seatsLeft}</span>
              </div>
              {/*<div
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2px",
              }}
            ></div>*/}
            </div>
          </div>
        </Fonts>
        <Button
          onClick={() => {
            props.onEventClicked(props.event);
            props.onDetailOpen();
            props.onModalOpen(window.pageYOffset);
            scrollToInfo(window.pageYOffset);
          }}
          className={classes.Button}
        >
          <strong>Details</strong>
        </Button>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Event);
