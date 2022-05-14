import React from "react";
import Fonts from "react-font";
import { Button } from "antd";

import classes from "./Profile.module.css";

const Profile = (props) => {
  return (
    <div className={classes.Profile}>
      <div className={classes.UserInfo}>
        <div style={{ width: "25%" }} />
        <div className={classes.Labels}>
          <Fonts family="Rubik">
            <div style={{ height: "30px" }} />
            <div>User name:</div>
            <div style={{ height: "15px" }} />
            <div>E-mail:</div>
            <div style={{ height: "15px" }} />
            <div>Password:</div>
          </Fonts>
        </div>
        <div className={classes.Infos}>
          <Fonts family="Rubik">
            <div style={{ height: "30px" }} />
            <div>{props.userInfo.name}</div>
            <div style={{ height: "15px" }} />
            <div>{props.userInfo.email}</div>
            <div style={{ height: "15px" }} />
            <div>******</div>
          </Fonts>
        </div>
        <div style={{ width: "25%" }} />
      </div>
      <div className={classes.ProfileButtons}>
        <Button onClick={props.openForm}>Update Profile</Button>
        <Button onClick={props.openPasswordForm}>Change Password</Button>
      </div>
    </div>
  );
};

export default Profile;
