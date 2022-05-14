import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { useHistory } from "react-router-dom";

import Profile from "../../components/Account/Profile/Profile";
import classes from "./ProfileContainer.module.css";
import services from "../../apiService/services";
import ProfileForm from "../../components/Account/ProfileForm/ProfileForm";
import PasswordForm from "../../components/Account/PasswordForm/PasswordForm";
import Reservations from "../../components/Reservations/Reservations";
import Spinner from "../../UI/Spinner/Spinner";
import * as actionTypes from "../../store/actions/action";
import setLoggedOut from "../../utils/setLoggedOut";
import EventDetails from "../../components/EventDetails/EventDetails";

const ProfileContainer = (props) => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [reservationsInfo, setReservationsInfo] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [passwordFormOpen, setPasswordFormOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await services.get("/users/me");
      setUserInfo(res.data.data);
    } catch (err) {
      message.error("Cannot get user information! Please try logging again!");
      setLoggedOut(true);
      props.setLoggedIn(false);
      history.push("/login");
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await services.get("/reservations/me");
      setReservationsInfo(res.data.data);
    } catch (err) {
      message.error("Cannot get your reservations!");
    }
  };

  useEffect(async () => {
    await fetchData();
    if (localStorage.getItem("userRole") === "user") {
      setLoading(true);
      await fetchReservations();
      setLoading(false);
    }
  }, []);

  const onFinishInfoUpdate = async (user) => {
    try {
      setLoading(true);
      const res = await services.patch("/users/me", user.user);
      await fetchData();
      openFormHandler();
      setLoading(false);
      message.success("Your user information is updated successfully!");
    } catch (err) {
      message.error("Could not update info! Try again.");
      setLoading(false);
    }
  };

  const onFinishPasswordUpdate = async (user) => {
    try {
      setLoading(true);
      const res = await services.patch("/users/update-password", user.user);
      await fetchData();
      openPasswordFormHandler();
      setLoading(false);
      message.success("Password is changed successfully!");
    } catch (err) {
      message.error("Could not update password! Try again.");
      setLoading(false);
    }
  };

  const scrollOnClose = (posY) => {
    setTimeout(() => {
      window.scrollTo(0, props.scrollY);
    }, 500);
  };

  const openFormHandler = () => {
    setFormOpen(!formOpen);
  };

  const openPasswordFormHandler = () => {
    setPasswordFormOpen(!passwordFormOpen);
  };

  return (
    <div className={classes.ProfileContainer}>
      <div style={{ width: "100%", height: "80px" }} />
      {loading ? <Spinner /> : null}
      <Profile
        userInfo={userInfo}
        openForm={openFormHandler}
        openPasswordForm={openPasswordFormHandler}
      />
      {formOpen ? (
        <ProfileForm
          scrollOnClose={scrollOnClose}
          show={formOpen}
          closed={openFormHandler}
          onSubmitForm={onFinishInfoUpdate}
        />
      ) : null}
      {passwordFormOpen ? (
        <PasswordForm
          scrollOnClose={scrollOnClose}
          show={passwordFormOpen}
          closed={openPasswordFormHandler}
          onSubmitForm={onFinishPasswordUpdate}
        />
      ) : null}
      <div style={{ width: "100%", height: "20px" }} />
      {userInfo.role === "user" ? (
        <Reservations reservations={reservationsInfo} />
      ) : null}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
