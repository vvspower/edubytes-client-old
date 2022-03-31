import React from "react";
import classes from "./popular.module.css";
import thumbsup from "../../Images/thumbsup.gif";
import { useNavigate } from "react-router-dom";

const PopularPost = (props) => {
  const navigate = useNavigate();
  
  

  return (
    <div
      onClick={() =>
        navigate(`/discuss/post/p?id=${props.id}&user=${props.user}`)
      }
      className={classes.Popular}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p className={classes.title}>{props.title.substring(0, 25)}..</p>
        <p className={classes.Badge}>Popular</p>
      </div>
      <p className={classes.desc}>{props.description.substring(0, 90)}...</p>
      <div className={classes.Bottom}>
        <div className={classes.User}>
          <p>
            <div>
              {props.likes !== 0 ? props.likes?.slice(0,4).map((item, i) => {
                return (
                  <img
                    style={{ borderRadius: "50%" }}
                    src={item.pfp}
                    height={15}
                    width={15}
                  />
                );
              }) : null}
            </div>
            <span>{props.likes.length} Users Liked</span>
          </p>
        </div>
        <p style={{ fontSize: "14px", color: "blue" }} href="/id">
          View Discussion
        </p>
      </div>
    </div>
  );
};

export default PopularPost;
