import React from "react";
import classes from "./contribute.module.css";
import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";

const PopularNotes = () => {
  return (
    <div style={{paddingTop: "10px"}} className={classes.PopularNotes}>
      <div
        style={{
          display: "flex",
          gap: "110px",
          // maxWidth: "200px",
          marginLeft: "10px",
          marginTop: "10px",
          marginBottom: "6px",
        }}
      >
        <h6 style={{ margin: "0" }}>Notes</h6>
        <Link
          to="/notes"
          style={{ margin: "0px", color: "#ced4da", fontSize: "12px" }}
        >
          View All>
        </Link>
      </div>
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />

      <a
        href="/contribute"
        style={{
          marginLeft: "15px",
          fontSize: "12px",
          textDecoration: "underline",
          color: "#ced4da",
          display: "inline-block",
          marginBottom: "10px",
        }}
      >
        Contribute
      </a>
    </div>
  );
};

export default PopularNotes;
