import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, Menu, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import setLoggedOut from "../../../utils/setLoggedOut";
import classes from "./Navigation.module.css";
import services from "../../../apiService/services";

const Navigation = (props) => {
  const history = useHistory();

  const [rerender, setRerender] = useState(false);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1000px)");
    console.log(media);
    if (media.matches) {
      setMatches(true);
    } else {
      setMatches(false);
    }
  }, []);

  const navigateRoute = (route) => {
    if (props.onMobile) {
      props.clicked();
    }
    history.push(route);
  };

  const userLogout = async () => {
    try {
      const res = await services.get("/users/logout");
      setLoggedOut();
      setRerender(!rerender);
      message.success("Logged out successfully!");
      navigateRoute("/");
    } catch (err) {
      message.error("Could not logout!");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        onClick={() => navigateRoute("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="2"
        onClick={() => {
          userLogout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  let loginProfile =
    localStorage.getItem("loggedIn") === "true" ? (
      matches ? (
        menu
      ) : (
        <Dropdown overlay={menu} className={classes.Dropdown}>
          <Button
            className={classes.Button}
            style={{ width: "100px", marginTop: "20px" }}
            type="link"
          >
            User <DownOutlined />
          </Button>
        </Dropdown>
      )
    ) : (
      <div>
        <div className={classes.LoginDiv}>
          <Button
            className={classes.Button}
            style={{ width: "60%", marginTop: "10px" }}
            onClick={() => navigateRoute("/login")}
            type="link"
          >
            Login
          </Button>
        </div>
        <span
          onClick={() => navigateRoute("/login")}
          className={classes.SignUpText}
        >
          or sign up!
        </span>
      </div>
    );

  return (
    <div className={classes.Navigation}>
      <div className={classes.NavInSite}>
        <Button
          onClick={() => navigateRoute("/")}
          className={classes.Button}
          type="link"
        >
          Home
        </Button>
        <Button />
        {localStorage.getItem("userRole") !== "admin" ? null : (
          <Button
            className={classes.Button}
            onClick={() => navigateRoute("/events-panel")}
            type="link"
          >
            Events Panel
          </Button>
        )}
        {localStorage.getItem("userRole") !== "admin" ? null : (
          <Button
            className={classes.Button}
            onClick={() => navigateRoute("/reservations-panel")}
            type="link"
          >
            Reservations Panel
          </Button>
        )}
      </div>
      <div className={classes.ProfileDiv}>{loginProfile}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
  };
};

export default connect(mapStateToProps)(Navigation);
