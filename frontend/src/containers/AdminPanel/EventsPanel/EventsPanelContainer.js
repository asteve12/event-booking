import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import EventsPanel from "../../../components/AdminPanel/EventsPanel/EventsPanel";
import services from "../../../apiService/services";
import classes from "../PanelsContainer.module.css";
import * as actionTypes from "../../../store/actions/action";
import scrollOnClose from "../../../utils/scrollOnClose";
import EventDetails from "../../../components/EventDetails/EventDetails";
import Spinner from "../../../UI/Spinner/Spinner";


const EventsPanelContainer = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [events, setEvents] = useState({});
  const [loadingTable, setLoadingTable] = useState(false);


  const fetchEvents = async () => {
    try {
      setLoadingTable(true);
      const res = await services.get("/events");
      setEvents(res.data.data);
      setLoadingTable(false);
      return res.data.data;
    } catch (err) {
      message.error("Could not fetch events! Please try reloading the page.");
    }
  };

  const deleteEventHandler = async (eventRecord) => {
    try {
      setLoading(true);
      const url = "/events/" + eventRecord.id;
      const res = await services.delete(url);
      setLoading(false);
      message.success("Event deleted successfully.");
      setReload(!reload);
      const temp = await fetchEvents();
      setEvents(temp);
    } catch (err) {
      message.error("Could not delete the event! Try again.");
      setLoading(false);
    }
  };

  const createEventHandler = async (
    values,
    selectedImage,
    imageDescription
  ) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("artist", values.artist);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("duration", values.duration);
    data.append("summary", values.summary);
    data.append("startDate", values.startDate);
    data.append("city", values.city);
    data.append("venue", values.venue);
    data.append("maxPeople", values.maxPeople);
    if (selectedImage) {
      data.append("photo", selectedImage, imageDescription);
    } else {
      message.error("You need to upload an image for the event!");
    }
    const url = "/events/";

    try {
      setLoading(true);
      const res = await services.post(url, data);
      setLoading(false);
      history.push("/events-panel");
      setReload(!reload);
      message.success("Event created successfully!");
    } catch (err) {
      message.error("Could not create event, please try again!");
      setLoading(false);
    }
  };

  const updateEventHandler = async (
    values,
    selectedImage,
    imageDescription,
    imgCover
  ) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("artist", values.artist);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("duration", values.duration);
    data.append("summary", values.summary);
    data.append("startDate", values.startDate);
    data.append("city", values.city);
    data.append("venue", values.venue);
    data.append("maxPeople", values.maxPeople);
    if (selectedImage) {
      data.append("photo", selectedImage, imageDescription);
    }
    for (let key of data.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    console.log(values.id);

    const url = "/events/" + values.id;

    try {
      setLoading(true);
      const res = await services.patch(url, data);
      setLoading(false);
      history.push("/events-panel");
      setReload(!reload);
      message.success("Event updated successfully!");
    } catch (err) {
      message.error("Could not update event, please try again!");
      setLoading(false);
    }
  };

  useEffect(async () => {
    const temp = await fetchEvents();
    setEvents(temp);
  }, [reload]);

  return (
    <div className={classes.EventsPanelContainer}>
      {loading ? <Spinner /> : null}
      <EventsPanel
        events={events}
        updateEvent={updateEventHandler}
        createEvent={createEventHandler}
        loadingTable={loadingTable}
        deleteEvent={deleteEventHandler}
      />
      {props.openDetails ? (
        <EventDetails
          open={props.openDetails}
          closed={props.onDetailOpen}
          scrollOnClose={scrollOnClose}
        />
      ) : null}
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
    onDetailOpen: () => dispatch({ type: actionTypes.OPEN_DETAILS }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPanelContainer);
