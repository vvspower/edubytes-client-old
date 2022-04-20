import React from "react";
import classes from "./comment.module.css";


const Comment = (props) => {
  return (
    <div className={classes.Comment}>
      <a href="/">
        <img height="25px" src={props.img} />
        <p style={{ margin: "0" }}>{props.comment}</p>
      </a>
    </div>
  );
};

export default Comment;
