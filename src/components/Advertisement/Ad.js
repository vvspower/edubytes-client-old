import React from "react";
import classes from "./ad.module.css";
import image from "../../Images/user.png";
import enroll from "../../Images/enroll.png";
import { Link } from "react-router-dom";



const ad = (props) => {
  const fee = `${props.fees/1000}K/Month`
  return (
    <div className={classes.Ad}>
      <a style={{ display: "inline-block" }} href={props.contact} target="_blank">
        <img className={classes.userImg} src={props.image} height="50px" width={50} />
        <div className={classes.TeacherInfo}>
          <h6 className={classes.Name} style={{color: "black"}}>{props?.name?.length < 15 ? props.name : props?.name?.substring(0,13) + ".."}</h6> 
          {/* substring function to limit the length of string displayed*/}
          <div>
            <p className={classes.Subject}>{props.subject}</p>
            <span>{`${props.fees !== "" ? fee : props.institution }`}</span> 
            {/* if user did not enter fee  ( because they are in a institution ) this will check that if no fees then display the institution instead */}
          </div>
        </div>
        <article className={classes.Button}>
          <img height="15px" src={enroll} />
          <p>Enroll</p>
        </article>
      </a>
    </div>
  );
};

export default ad;
