import React , {useContext , useEffect} from "react";
import NoteCard from "./NoteCard/NoteCard";
import classes from "./ViewNotes.module.css";
import dataContext from '../Context.js/dataContext'

const ViewNotes = () => {
    const context = useContext(dataContext)
    const Notes = context.Notes
    const fetchResources = context.fetchResources

    console.log(Notes)

    useEffect(() => {
      fetchResources()
    }, [])
    

  return (
    <div className="container">
      <div className={classes.ViewNotes}>
        <div className={classes.Search}>
          <svg
          style={{marginLeft: "10px"}}
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            height={20}
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="text"
            class="form-control"
            placeholder="Search for Notes"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
        </div>
        <div className={classes.NoteRender} >

            {Notes.map((item , i) => {
                return <NoteCard title={item.name} subject={item.subject} type={item.type} link={item.link} user={item.user} date={item.date}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
