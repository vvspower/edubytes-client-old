import React from "react";
import notes from "../../Images/notes.png";

const TopCard = (props) => {
  return (
    <div
      style={{
        padding: "10px 15px 0px 15px",
        backgroundColor: `${props.color}`,
        borderRadius: "8px",
        boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
        color: `${props.color !== "white" ? "white" : "black"}`,
      }}
    >
      <h5>
        <h6>{props.title}</h6>
        <img
          style={{ marginLeft: "80px", marginTop: "10px" }}
          src={props.image}
        />
      </h5>
    </div>
  );
};

export default TopCard;
