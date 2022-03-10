import React from "react";
import classes from "./nav.module.css";

const PostNav = () => {
  return (
    <div className={classes.Nav}>
      <div className="container">
        <a href="/hello">Notes</a>
        <a href="/hello">Blog</a>
        <a href="/hello">PostAd</a>
      </div>
    </div>
  );
};

export default PostNav;
