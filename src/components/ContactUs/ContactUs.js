import React from "react";
import classes from "./contact.module.css";
import twitter from "../../Images/twitter.png";
import github from "../../Images/github.png";
import youtube from "../../Images/youtube.png";
import linkedin from "../../Images/linkedin.png";

const ContactUs = () => {
  return (
    <div className="container">
      <div className={classes.Contact}>
        <h1>REACH OUT</h1>
        <p>if you have any questions or queries about this project</p>
        <div className={classes.Form}>
          <a href="https://twitter.com/horuk3n" target="_blank">
            <img src={twitter} height={40} />
          </a>
          <a href="https://github.com/MustafaAP" target="_blank">
            <img src={github} height={40} />
          </a>
          <a
            href="https://www.youtube.com/channel/UCKlDRAs3yyCLTqhVnrCrVBQ"
            target="_blank"
          >
            <img src={youtube} height={40} />
          </a>
          <a href="https://www.linkedin.com/in/mustafapanhwar/" target="_blank">
            <img src={linkedin} height={40} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
