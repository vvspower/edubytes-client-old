import React from "react";
import post from "../../Images/write.png";
import classes from "./post.module.css";
import write from "../../Images/write.png";

import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => {
      navigate("/discuss")
    }}
    className={classes.CPContainer}
    >
      <div>
        <h6 className={classes.askText}>Ask Question</h6>
      </div > 

      <div  style={{ display: "flex", gap: "20px" }}>
        
        <button
          
          className={classes.PostBtn}
          onClick={() => {
            navigate("/discuss");
          }}
          style={{
            border: "0",
            borderRadius: "50%",
            marginLeft: "25px",
            height: "40px",
            width: "40px",
            backgroundColor: "#4dabf7",

            // marginTop: "45px",
            padding: "4px 8px",
            fontSize: "14px",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="#fff"
            height={20}
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fill-rule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clip-rule="evenodd"
            />
          </svg>
         
          
        </button>
        </div>
        {/* <button
          style={{
            border: "0",
            borderRadius: "8px",
            backgroundColor: "#b559e4",
            color: "white",
            fontSize: "14px",
            fontFamily: "Noto Sans, sans-serif",
          }}
        >
          Contribute
        </button> */}
      </div>
   
  );
};

export default CreatePost;
