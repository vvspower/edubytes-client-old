import React , {useContext} from "react";
import classes from "./ad.module.css";
import image from "../../../Images/user.png";
import enroll from "../../../Images/enroll.png";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import dataContext from "../../Context.js/dataContext";

const Ad = (props) => {
  const context = useContext(dataContext);
  const currentAdId = context.currentAdId
  const setCurrentAdId = context.setCurrentAdId
  // name={item.name}
  // institution={item.institution}
  // image={item.image}
  // subject={item.subject}
  // fees={item.price}

  const fee = `${props.fees / 1000}K/Month`;
  return (
    <div>
      {/* <DeleteConfirmationModal id={props.id}/> */}
      <div className={classes.Ad}>
        <img
          className={classes.userImg}
          src={props.image}
          height="50px"
          width={50}
        />
        <div className={classes.TeacherInfo}>
          <h6 className={classes.Name} style={{ color: "black" }}>
            {props?.name?.length < 15
              ? props.name
              : props?.name?.substring(0, 13) + ".."}
          </h6>
          <div>
            <p className={classes.Subject}>{props.subject}</p>
            <span style={{ fontSize: "12px" }}>{`${
              props.fees !== "" ? fee : props.institution
            }`}</span>
          </div>
        </div>
        {/* <h6>10000/Month</h6> */}
        <article
        onClick={()=> setCurrentAdId(props.id)}
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#deleteAd"
          className={classes.Button}
        >
          <p>Delete</p>
        </article>
      </div>
    </div>
  );
};

export default Ad;
