import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Card, Avatar } from "antd";

import Events from "../../components/Events/Events";
import classes from "./HomeContainer.module.css";
import services from "../../apiService/services";
import EventDetails from "../../components/EventDetails/EventDetails";
import * as actionTypes from "../../store/actions/action";
import scrollOnClose from "../../utils/scrollOnClose";

const { Meta } = Card;

const cardStyle = { width: "30vw", height: "300px", marginTop: 16 };

const HomeContainer = (props) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    const fetchData = async () => {
      setLoading(true);
      const res = await services.get("/events");
      setEvents(res.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div style={{ display: "flex" }} className={classes.HomeBackground}>
      <div
        className={classes.HomeContainer}
        style={
          props.openDetails
            ? { overflow: "hidden", position: "fixed" }
            : { overflow: "unset" }
        }
      >
        {loading ? (
          <>
            <Card className={classes.CardStyle} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card className={classes.CardStyle} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card className={classes.CardStyle} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card className={classes.CardStyle} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card className={classes.CardStyle} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card className={classes.CardStyle} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </>
        ) : null}

        <Events events={events} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
