import React from "react";
import classes from "./contribute.module.css";
import image from "../../Images/presentation.png";

const TeachCard = () => {
  return (
    <div className={classes.Teach}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ marginLeft: "20px" }}>
          <h6>Join Us</h6>
          <p>Become a tutor</p>
        </div>
        <div>
          <img src={image} height="60px" />
        </div>
      </div>
      <a href="/join">Join</a>
    </div>
  );
};

export default TeachCard;
