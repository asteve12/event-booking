import React from "react";
import Fonts from "react-font";
import { Collapse, Button } from "antd";

import Reservation from "./Reservation/Reservation";
import ReservationHeader from "./ReservationHeader/ReservationHeader";
import classes from "./Reservations.module.css";

const { Panel } = Collapse;

const Reservations = (props) => {
  let reservations = props.reservations
    ? props.reservations.map((reservation, id) => (
        <Panel
          header={
            <ReservationHeader
              tickets={reservation.tickets}
              title={reservation.event.title}
              startDate={reservation.event.startDate}
            />
          }
          key={id}
        >
          <Reservation reservation={reservation} key={id} />
        </Panel>
      ))
    : null;

  return (
    <div className={classes.Reservations}>
      <div
        style={{ top: "0", height: "60px", width: "100%", fontSize: "20px" }}
      >
        <Fonts family="Rubik">My Reservations</Fonts>
      </div>
      <Collapse style={{ width: "100%" }} accordion>
        {reservations}
      </Collapse>
    </div>
  );
};

export default Reservations;
