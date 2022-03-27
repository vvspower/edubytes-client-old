import React, { useContext, useEffect , useState } from "react";
import classes from "./latest.module.css";
import thumbsup from "../../Images/thumbsup.gif";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import like from "../../Images/like.png";
import likeamount from "../../Images/likeamount.png";
import pencil from "../../Images/pencil.png";
import view from "../../Images/view.png";
import reply from "../../Images/chat.png";
import dataContext from "../Context.js/dataContext";

const HotPosts = (props) => {
  const navigate = useNavigate();
  const [pfp, setpfp] = useState("");
  const [replies , setreplies] = useState(0)
  const context = useContext(dataContext)
  const fetchReplies = context.fetchReplies

  const address = "http://localhost:5000"
  
  console.log(props);

  const getPfp = async (id) => {
    const response = await fetch(
      `${address}/api/auth/getusernoauth/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    setpfp(json.pfp);
  };
  console.log(replies)

  useEffect( async () => {
  getPfp(props.user)
  const data = await fetchReplies(props.id)
  setreplies(data.length)

  }, [])
  

  console.log(props);

  return (
    <div
      onClick={() => navigate(`/discuss/post/p?id=${props.id}&user=${props.user}`)}
      className={classes.Latest}
    >
      <div className={classes.Container}>
        <div className={classes.pfp}>
         
          <img style={{borderRadius: "50%"}} src={pfp} height={30} width={30}/>
        </div>
        <div className={classes.Header}>
          <h6>
            {props.username} posted <Link to="">{props.title}</Link>
          </h6>
        </div>
      </div>
      <div style={{ display: "flex", gap: "3px", marginTop: "10px" }}>
        {props.tag.split(",").map((item, i) => {
          return <span key={i} className="badge rounded-pill">{item}</span>;
        })}
      </div>
      <p className={classes.description}>{props.description}</p>
      <div
        className={classes.Interaction}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#ced4da"
          height={20}
        >
          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
        </svg>
        <img style={{ marginLeft: "0px" }} src={likeamount} height="20px" />
        <p>{props?.likes}</p>
      
        {/* <span className={classes.ReportBtn}>...</span> */}
        <svg
          style={{ marginLeft: "15px" }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#ced4da"
          height={20}
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
        <p style={{ marginLeft: "5px" }}>{replies}</p>
      </div>
    </div>
  );
};

export default HotPosts;
