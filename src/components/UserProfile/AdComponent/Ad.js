import React from "react";
import classes from "./ad.module.css";
import image from '../../../Images/user.png'
import enroll from '../../../Images/enroll.png'
import { Link } from "react-router-dom";

const ad = (props) => {
  // name={item.name}
  // institution={item.institution}
  // image={item.image}
  // subject={item.subject}
  // fees={item.price}

  const fee = `${props.fees/1000}K/Month`
  return (
    <div className={classes.Ad}>
     
        <img className={classes.userImg} src={props.image} height="50px" width={50} />
        <div className={classes.TeacherInfo}>
          <h6 className={classes.Name} style={{color: "black"}}>{props?.name?.length < 15 ? props.name : props?.name?.substring(0,13) + ".."}</h6>
          <div>
            <p className={classes.Subject}>{props.subject}</p>
            <span style={{fontSize: "12px"}}>{`${props.fees !== "" ? fee : props.institution }`}</span>
          </div>
        </div>
        {/* <h6>10000/Month</h6> */}
        <article className={classes.Button}>
          <img height="15px" src={enroll} />
          <p>Enroll</p>
        </article>
    
    </div>
  );
};

export default ad;
