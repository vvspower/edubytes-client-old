import React from "react";
import user from "../../../Images/user.png";
import classes from "./TeacherCard.module.css";

const TeacherCard = () => {
  return (
    <div className={classes.Container}>
      <div className="d-flex gap-4 align-items-center ">
        <img src={user} height={100} />
        <div>
          <h2>Shamvil Raza</h2>
          <div> 
            <div className="d-flex gap-2 align-items-center">
              <h6>A level</h6>
              <span>10K/Month</span>
            </div>
            <p>Mathematics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
