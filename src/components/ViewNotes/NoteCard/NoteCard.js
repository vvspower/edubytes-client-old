import React, { useState, useEffect } from "react";
import classes from "./NoteCard.module.css";
import { useNavigate, Link } from "react-router-dom";

const NoteCard = (props) => {
  const [userinfo, setuserinfo] = useState("");
  const handleClick = () => {
    window.location.assign(props.link);
  };
  const address = process.env.REACT_APP_HEROKU_API;
  const date = new Date(props.date);

  const fetchUserInfo = async (id) => {
    const response = await fetch(`${address}/api/auth/user/${props.user}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setuserinfo(json);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div onClick={handleClick} className={classes.NoteCard}>
      <div
        style={{ textDecoration: "none", color: "black" }}
        target="_blank"
        href={props.link}
      >
        <div>
          <h6>{props.title.substring(0, 30)}</h6>
          <p>{props.subject}</p>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            height={15}
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{userinfo.name}</span>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            height={15}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{date.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
