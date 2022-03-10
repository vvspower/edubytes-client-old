import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.Container}>
        <div>
          <h6>StudentConnect</h6>
          <div className={classes.Links}>
            <a href="github">University Connection</a>
            <a href="github">Discuss</a>
            <a href="github">Contribute</a>
            <a href="github">Tutor</a>
            <a href="github">Contact</a>
            <a href="github">Notes</a>
          </div>
        </div>
        <div>
          <h6>Developer</h6>
          <div className={classes.Links}>
            <a href="github">Github</a>
            <a href="github">Linkedin</a>
            <a href="github">StackOverflow</a>
            <a href="github">Facebook</a>
            <a href="github">Youtube</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
