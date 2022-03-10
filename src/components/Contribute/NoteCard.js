import React from "react";
import classes from "./contribute.module.css";

const NoteCard = () => {
  return (
    <div>
      <div  className={classes.Notes}>
        <a style={{width: "100px"}} href="/">
          <p style={{ fontSize: "14px" ,  color: "#495057" , maxWidth: "200px" }}>
            Mathematics O Level Notes
          </p>
          <p style={{ fontSize: "12px", color: "#495057", margin: "0" , maxWidth: "200px"  }}>
            By Xeeshan Ali
          </p>
        </a>
      </div>
    </div>
  );
};

export default NoteCard;
