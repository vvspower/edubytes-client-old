import React, { useEffect , useState } from "react";
import classes from "./latest.module.css";
import thumbsup from "../../Images/thumbsup.gif";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import like from "../../Images/like.png";
import likeamount from "../../Images/likeamount.png";
import pencil from "../../Images/pencil.png";
import view from "../../Images/view.png";
import reply from "../../Images/chat.png";

const HotPosts = (props) => {
  const navigate = useNavigate();
  const [pfp, setpfp] = useState("");
  
  console.log(props);

  const getPfp = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/auth/getusernoauth/${id}`,
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

  useEffect(() => {
  getPfp(props.user)
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
          return <span className="badge rounded-pill">{item}</span>;
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
        <p>{props?.likes?.length}</p>
        <svg
          style={{ marginLeft: "15px" }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#ced4da"
          height={20}
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          />
        </svg>
        <p style={{ marginLeft: "5px" }}>0</p>
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
        <p style={{ marginLeft: "5px" }}>0</p>
      </div>
    </div>
  );
};

export default HotPosts;
