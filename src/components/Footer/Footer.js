import React from "react";
import classes from "./footer.module.css";
import logo from "../../Images/edubytes.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={classes.Footer}>
      <div className={classes.Container}>
        {/* <div className={classes.Links}> */}
        <div>
          <img src={logo} height={20} />
        </div>
        <div className={classes.Links}>
          <Link style={{ color: "black" }} to="/contribute">
            Contribute
          </Link>
          <Link style={{ color: "black" }} to="/Discuss">
            Discuss
          </Link>
          <Link style={{ color: "black" }} to="/Notes">
            Notes
          </Link>
          <Link style={{ color: "black" }} to="/contribute">
            Github
          </Link>
          <Link style={{ color: "black" }} to="/contribute">
            Linkedin
          </Link>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Footer;
