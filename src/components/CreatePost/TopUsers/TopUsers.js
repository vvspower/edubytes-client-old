import React from "react";
import classes from "./topuser.module.css";

const TopUsers = (props) => {
  return (
    <div>
      <div className={classes.TopUser}>
        <div>
          <h6
            style={{
              // fontFamily: "Racing Sans One, cursive",
              color: "#ffa31a",
            }}
          >
            1
          </h6>
        </div>
        <div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span>o</span>
            <h6 style={{ margin: "0" }}>{props.name}Mustafa</h6>
          </div>
          <p>133 {props.follows} Followers</p>
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
