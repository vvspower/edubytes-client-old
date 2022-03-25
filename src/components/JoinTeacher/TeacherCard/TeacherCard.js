import React from "react";
import user from "../../../Images/user.png";
import classes from "./TeacherCard.module.css";

const TeacherCard = (props) => {
  return (
    <div className={classes.Container}>
      <div className="d-flex gap-4 align-items-center ">
        <img src={props.image} height={100} width={100} />
        <div>
          <h5>{props.name}</h5>
          <div> 
            <div className="d-flex gap-2 align-items-center">
              <span>{props.subject}</span>
            </div>
            <p>{props.institution}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
