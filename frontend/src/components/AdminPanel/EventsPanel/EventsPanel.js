import React, { useState } from "react";

import classes from "./EventsPanel.module.css";
import EventsTable from "./EventsTable/EventsTable";
import UpdateEventForm from "./UpdateEventForm/UpdateEventForm";
import AddEventForm from "./AddEventForm/AddEventForm";

const EventsPanel = (props) => {
  // 0 for table, 1 for update form, 2 for add form
  const [showComponent, setShowComponent] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);

  const showComponentHandler = (componentNumber, selectedEvent) => {
    if (selectedEvent) {
      setCurrentEvent(selectedEvent);
    } else setCurrentEvent(null);
    setShowComponent(componentNumber);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "20px" }} />
      <div className={classes.EventsPanel}>
        {showComponent === 0 ? (
          <EventsTable
            changeComponent={showComponentHandler}
            events={props.events}
            deleteEvent={props.deleteEvent}
            loadingTable={props.loadingTable}
          />
        ) : null}
        {showComponent === 1 ? (
          <UpdateEventForm
            currentEvent={currentEvent}
            changeComponent={showComponentHandler}
            updateEvent={(record, selectedImage, imageDescription) => {
              props.updateEvent(record, selectedImage, imageDescription);
              setShowComponent(0);
            }}
          />
        ) : null}
        {showComponent === 2 ? (
          <AddEventForm
            changeComponent={showComponentHandler}
            createEvent={(record, selectedImage, imageDescription) => {
              props.createEvent(record, selectedImage, imageDescription);
              setShowComponent(0);
            }}
          />
        ) : null}
      </div>
      <div style={{ height: "20px" }} />
    </div>
  );
};

export default EventsPanel;
