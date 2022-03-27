import React, { useEffect, useContext, useState } from "react";
import dataContext from "../Context.js/dataContext";
import classes from "./latest.module.css";
import thumbsup from "../../Images/thumbsup.gif";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import UserInfoHover from "../UserInfoHover/UserInfoHover";

const LatestNotes = (props) => {
  const context = useContext(dataContext);
  const fetchUserInfo = context.fetchUserInfo;
  const navigate = useNavigate();
  const [pfp, setpfp] = useState("");
  const date = new Date(props.date);
  // var str = props.username;
  // var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
  // var acronym = matches.join("").toUpperCase(); // JSON
  console.log(props);

  const address = "http://localhost:5000"

  const getPfp = async (id) => {
    const response = await fetch(
      `${address}/api/auth/getusernoauth/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setpfp(json.pfp);
  };

  useEffect(() => {
    getPfp(props.user);
  }, []);

  console.log(props);

  return (
    <div
      onClick={() => {
        navigate(`/discuss/post/p?id=${props.id}&user=${props.user}`);
      }}
      className={classes.Latest}
    >
      {props.image !== ""   ? (
        <div className={classes.postImage}>
          <img src={props.image} />
        </div>
      ) : null}
      <div>
        <div className={classes.Container}>
          <div className={classes.pfp}>
            <div className={classes.Info}>
              <UserInfoHover user={props.user} />
            </div>
            {/* <a >U</a> */}
            <img
              style={{ borderRadius: "50%" }}
              onMouseEnter={() => fetchUserInfo(props.user)}
              src={pfp}
              height={30}
              width={30}
            />
          </div>
          <div className={classes.Header}>
            <h6>
              {props.username} posted <Link to="">{props.title}</Link>
            </h6>
            <p className={classes.Date}> {date.toLocaleString()}</p>
          </div>
        </div>
        <div className={classes.AltImage}>
          <p className={classes.description}>
            {props.description.substring(0, 130)}...
          </p>
          {props.image !== "" ? (
            <div>
              <img style={{maxWidth: ""}} src={props.image} />
            </div>
          ) : null}
        </div>

        {/* <button>View</button> */}
        {/* tags will come in text form seperated with commas. turn it into an array and loop it  */}
        <div style={{ display: "flex", gap: "3px", marginTop: "10px" }}>
          {props.tag.split(",").map((item, i) => {
            return <span className="badge rounded-pill">{item}</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestNotes;
