import React , {useContext, useEffect} from "react";
import classes from "./contribute.module.css";
import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";
import dataContext from "../Context.js/dataContext";
import loader from '../../Images/default-loading.gif'


const PopularNotes = () => {

  const context = useContext(dataContext)
  const fetchResources = context.fetchResources
  const Notes = context.Notes

  useEffect(() => {
    fetchResources();
    console.log(Notes)
  }, []);


  console.log(Notes)
  return (
    <div style={{ paddingTop: "10px" }} className={classes.PopularNotes}>
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
      <div>
        {Notes.length < 1 ? <img className={classes.Loading} src={loader} height={50}/> : Notes.map((item, i) => {
          return <NoteCard title={item.name} user={item.user} link={item.link}/>
        }) }
      </div>

      <Link
        to="/contribute"
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
      </Link>
    </div>
  );
};

export default PopularNotes;
