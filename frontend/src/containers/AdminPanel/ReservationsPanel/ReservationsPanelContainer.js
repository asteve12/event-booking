import React, { useEffect, useState } from "react";
import { message } from "antd";

import services from "../../../apiService/services";
import classes from "../PanelsContainer.module.css";
import ReservationsTable from "../../../components/AdminPanel/ReservationsPanel/ReservationsTable";

const EventsPanelContainer = (props) => {
  const [reload, setReload] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchReservations = async () => {
    try {
      setLoadingTable(true);
      const res = await services.get("/reservations");
      setLoadingTable(false);
      return res.data.data;
    } catch (err) {
      message.error(
        "Could not fetch reservations! Please try reloading the page."
      );
    }
  };

  const deleteReservationHandler = async (reservationRecord) => {
    try {
      console.log(reservationRecord);
      const url = "/reservations/" + reservationRecord._id;
      const res = await services.delete(url);
      message.success("Reservation deleted successfully.");

      setReload(!reload);
    } catch (err) {
      message.error("Could not delete the event! Try again.");
    }
  };

  useEffect(async () => {
    const temp = await fetchReservations();
    setReservations(temp);
  }, [reload]);

  return (
    <div className={classes.ReservationsPanelContainer}>
      <ReservationsTable
        reservations={reservations}
        deleteReservation={deleteReservationHandler}
        loadingTable={loadingTable}
      />
    </div>
  );
};

export default EventsPanelContainer;
