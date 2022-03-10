import React from "react";
import classes from "./contribute.module.css";
import image from "../../Images/contactinfo.png";

const Contactus = () => {
  return (
    <div>
      <div className={classes.Teach}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div>
            <img src={image} height="100px" />
          </div>
          <div>
            <h6>Contact us</h6>
            <p>Discuss with us</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "15px",
              }}
            >
              <button>Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
