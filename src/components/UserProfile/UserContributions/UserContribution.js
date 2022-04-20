import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./Contribution.module.css";
import dataContext from "../../Context.js/dataContext";

const UserContribution = (props) => {
  const context = useContext(dataContext);
  const fetchUserResources = context.fetchUserResources;
  const [Notes, setNotes] = useState([]);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(async () => {
    let notes = await fetchUserResources(id);
    setNotes(notes);
  }, []);

  

  return (
    <div>
      { Notes.length > 0 ? Notes.map((item, i) => {
        return (
          <div key={item?._id} className={classes.Notes}>
            <a href={item.link} target="_blank">
              <h6>{item.name}</h6>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#868e96"
                stroke-width="2"
                height={14}
              >
                  <p>{item.date}</p>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        );
      }) : <p style={{marginTop: "30px" , paddingBottom: "10px"}}>No Contributions</p>}
      <div>
        {

}
       

      </div>
    </div>
  );
};

export default UserContribution;
