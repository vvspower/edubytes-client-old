import React from "react";
import classes from "./ad.module.css";
import image from "../../Images/user.png";
import enroll from "../../Images/enroll.png";
import { Link } from "react-router-dom";

const ad = () => {
  return (
    <div className={classes.Ad}>
      <Link style={{ display: "inline-block" }} to="/teacher">
        <img className={classes.userImg} src={image} height="50px" />
        <div className={classes.TeacherInfo}>
          <h6>Shamvil Raza</h6>
          <div>
            <p style={{ fontSize: "12px" }}>A level Maths</p>
            <span>10k/M</span>
          </div>
        </div>
        {/* <h6>10000/Month</h6> */}
        <article className={classes.Button}>
          <img height="15px" src={enroll} />
          <p>Enroll</p>
        </article>
      </Link>
    </div>
  );
};

export default ad;
