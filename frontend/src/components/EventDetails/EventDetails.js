import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Fonts from "react-font";
import {
  FaCalendarAlt,
  FaChair,
  FaClock,
  FaFontAwesome,
  FaMapMarkedAlt,
  FaMapMarker,
  FaMoneyBill,
  FaUserFriends,
} from "react-icons/fa";
import { Button } from "antd";

import Backdrop from "../../UI/Backdrop/Backdrop";
import formatDate from "../../utils/formatDate";
import classes from "./EventDetails.module.css";

const EventDetails = (props) => {
  const history = useHistory();
  const eventBox = useRef(null);
  let eventData = props.eventDetails ? props.eventDetails : {};

  return (
    <div>
      <Backdrop
        show={props.open}
        clicked={props.closed}
        scrollOnClose={props.scrollOnClose}
      />
      <div className={classes.EventDetailsPage} ref={eventBox}>
        <Fonts family="Rubik">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {eventData.title}
          </p>

          <div
            style={{ height: "40%", width: "100%" }}
            className={classes.Image}
          >
            <img
              className={classes.Image}
              src={eventData.imageCover}
              alt={eventData.title}
            />
          </div>
          <div style={{ height: "20px" }} />
          <div>
            <p style={{ fontSize: "16px" }}>{eventData.summary}</p>
          </div>
          <div style={{ height: "30px" }} />
          <div
            className={classes.Information}
            style={{ flexDirection: "column" }}
          >
            <div className={classes.Information}>
              <div className={classes.Icons}>
                <FaCalendarAlt className={classes.IconFont}  />
              </div>
              <div className={classes.Info}>
                <span className={classes.InfoSpan}>
                  {formatDate(eventData.startDate)}
                </span>
              </div>
            </div>
            <div className={classes.Information}>
              <div className={classes.Icons}>
                <FaMapMarkedAlt className={classes.IconFont} />
              </div>
              <div className={classes.Info}>
                <span className={classes.InfoSpan}>
                  {eventData.location.city}, {eventData.location.venue}
                </span>
              </div>
            </div>
            <div className={classes.Information}>
              <div className={classes.Icons}>
                <FaClock className={classes.IconFont} />
              </div>
              <div className={classes.Info}>
                <span className={classes.InfoSpan}>
                  {eventData.duration} minutes
                </span>
              </div>
            </div>
            <div className={classes.Information}>
              <div className={classes.Icons}>
                <FaUserFriends className={classes.IconFont} />
              </div>
              <div className={classes.Info}>
                <span className={classes.InfoSpan}>
                  {eventData.maxPeople} people max
                </span>
              </div>
            </div>
            <div className={classes.Information}>
              <div className={classes.Icons}>
                <FaMoneyBill className={classes.IconFont} />
              </div>
              <div className={classes.Info}>
                <span className={classes.InfoSpan}>
                  {eventData.price} $ per one person
                </span>
              </div>
            </div>
            <div className={classes.Information}>
              <div className={classes.Icons}>
                <FaChair className={classes.IconFont} />
              </div>
              <div className={classes.Info}>
                <span className={classes.InfoSpan}>
                  {eventData.seatsLeft} seats left
                </span>
              </div>
            </div>
          </div>
        </Fonts>
        <div style={{ height: "40px" }} />
        {localStorage.getItem("userRole") === "user" ? (
          <Button onClick={() => history.push("/checkout")} className={classes.Button}>BOOK NOW!</Button>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventDetails,
    openDetails: state.openDetails,
  };
};

export default connect(mapStateToProps)(EventDetails);
