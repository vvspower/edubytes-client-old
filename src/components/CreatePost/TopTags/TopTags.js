import React from "react";
import classes from "./tags.module.css";

const TopTags = () => {
  return (
    <div className={classes.Tag}>
      <h6>Hot topic list</h6>
      <div style={{ marginTop: "15px" }}>
        <span className="badge rounded-pill">Physics</span>
        <span className="badge rounded-pill">Javascript</span>
        <span className="badge rounded-pill">Javascript</span>
        <span className="badge rounded-pill">Maths</span>
        <span className="badge rounded-pill">Javascript</span>
        <span className="badge rounded-pill">Computer Science</span>
        <span className="badge rounded-pill">Chemistry</span>
        <span className="badge rounded-pill">Looking for help</span>
        <span className="badge rounded-pill">Accounts</span>
        <span className="badge rounded-pill">MCQ</span>
        <span className="badge rounded-pill"></span>
        <span className="badge rounded-pill">Javascript</span>
        <span className="badge rounded-pill">Javascript</span>
      </div>
    </div>
  );
};

export default TopTags;
