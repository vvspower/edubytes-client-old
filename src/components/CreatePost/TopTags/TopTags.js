import React from "react";
import classes from "./tags.module.css";

const TopTags = () => {
  return (
    <div className={classes.Tag}>
      <h6>Hot topic list</h6>
      <div style={{ marginTop: "15px" }}>
        <span className="badge rounded-pill">Physics</span>
        <span className="badge rounded-pill">Chemistry</span>
        <span className="badge rounded-pill">Biology</span>
        <span className="badge rounded-pill">Computer Science</span>
        <span className="badge rounded-pill">Help</span>
        <span className="badge rounded-pill">Question</span>
        <span className="badge rounded-pill">Accounting</span>
        <span className="badge rounded-pill">Maths</span>
        <span className="badge rounded-pill">MCQ</span>
        <span className="badge rounded-pill">Quick</span>
        <span className="badge rounded-pill"></span>
        <span className="badge rounded-pill">All</span>
        <span className="badge rounded-pill">:)</span>
      </div>
    </div>
  );
};

export default TopTags;
