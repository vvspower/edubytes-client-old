import React from "react";
import image from "../Images/exclamation.png";

const Beta = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // borderBottom: "1px solid #e9ecef",
          paddingBottom: "10px",
          paddingTop: "20px",
        }}
      >
        <img src={image} height="50px" />
        <div>
          <p style={{ margin: "0", color: "#ced4da" }}>v1.0.0</p>
          <h5 style={{ margin: "0" }}>Website is currently in beta</h5>
        </div>
      </div>
    </div>
  );
};

export default Beta;
