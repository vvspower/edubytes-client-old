import React, { useEffect, useContext, useState } from "react";
import dataContext from "../Context.js/dataContext";
import classes from "./userinfo.module.css";
import loading from "../../Images/loading2.gif";
import userimage from "../../Images/user.png";
import { useNavigate } from "react-router-dom";

const UserInfoHover = (props) => {
  const context = useContext(dataContext);
  const navigate = useNavigate()
  
  const fetchUserInfo = context.fetchUserInfo;
  const success = context.hoversuccess;
  //   const [success, setsuccess] = useState(false);
  const user = context.user;
  useEffect(() => {
    let success = fetchUserInfo(props.user);
  }, []);

  
  return (
    <>
      <div onClick={() => {
        navigate(`/u/user?id=${user._id}`)
        window.location.reload()}} className={classes.UserInfo}>
        
        {success ? (
          <div>
            <div className="d-flex gap-2">
              <img
                style={{ borderRadius: "8px" }}
                src={user.pfp}
                height={60}
                width={60}

              />
              <div>
                <h6 className="my-0 mx-2">{user.name}</h6>
                <p style={{ marginLeft: "8px", marginTop: "6px" }}>
                  Contributions:{" "}
                  <span style={{ backgroundColor: "white" }}>1</span>
                </p>
                <p
                  style={{
                    marginLeft: "8px",
                    marginTop: "2px",
                    color: "#adb5bd",
                  }}
                >
                  {user?.bio?.substring(0,30)}
                </p>
              </div>
            </div>
            <div className={classes.UserStats}>
              <div className={classes.UserStatsChild}>
                <p>Liked</p>
                <h6>{user.likes}</h6>
              </div>
              <div style={{opacity: "0"}} className={classes.UserStatsChild}>
                <p>Followers</p>
                <h6>69</h6>
              </div>
              <div>
                <button>View Profile</button>
              </div>
            </div>
          </div>
        ) : (
          //   <h6>Loading...</h6>
          <div className={classes.Loading}>
            <img src={loading} height={60} />
          </div>
        )}
      </div>
    </>
  );
};

export default UserInfoHover;
