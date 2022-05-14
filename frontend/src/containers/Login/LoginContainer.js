import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../../components/Login/Login";
import { message } from "antd";

import services from "../../apiService/services";
import setLoggedIn from "../../utils/setLoggedIn";
import classes from "./LoginContainer.module.css";
import * as actionTypes from "../../store/actions/action";

const LoginContainer = (props) => {
  const history = useHistory();

  const submitSignup = async (user) => {
    try {
      const res = await services.post("/users/signup", user.user);
      console.log(res);
      const userData = res.data.data.newUser;
      setLoggedIn(userData.name, userData.email, userData.role);
      props.loggedIn(true);
      props.setUserRole(userData.role);
      history.push("/");
      window.location.reload();
      message.success("Signed up successfully!");
    } catch (err) {
      message.error("Cannot sign up! Try with a different e-mail address.");
    }
  };
  const submitLogin = async (user) => {
    try {
      const res = await services.post("/users/login", user.user);
      const userData = res.data.data.user;
      setLoggedIn(userData.name, userData.email, userData.role);
      props.loggedIn(true);
      props.setUserRole(userData.role);
      history.push("/");
      window.location.reload();
      message.success("Logged in successfully!");
    } catch (err) {
      message.error("Cannot login! Check your credentials.");
    }
  };
  return (
    <div className={classes.LoginContainer}>
      <div style={{ height: "60px" }} />
      <Login onFinishSignup={submitSignup} onFinishLogin={submitLogin} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserRole: (role) =>
      dispatch({ type: actionTypes.SET_USER_ROLE, val: role }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
