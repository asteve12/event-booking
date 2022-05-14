import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import Backdrop from "../Backdrop/Backdrop";

const Spinner = (props) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  return (
    <div>
      <Backdrop show zIndex={"550"} />
      <div
        style={{
          position: "absolute",
          zIndex: "600",
          fontSize: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "500px",
          top: "0",
        }}
      >
        <Spin style={{ fontSize: "70px" }} indicator={antIcon} />
      </div>
    </div>
  );
};

export default Spinner;
