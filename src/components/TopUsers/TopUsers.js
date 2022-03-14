import React, { useContext, useEffect, useState } from "react";
import classes from "./TopUser.module.css";
import user from "../../Images/user.png";
import dataContext from "../Context.js/dataContext";
import { useNavigate } from "react-router-dom";

const TopUsers = () => {
  const navigate = useNavigate();
  const context = useContext(dataContext);
  const fetchAllUsers = context.fetchAllUsers;
  const [users, setusers] = useState([]);
  // http://localhost:5000/api/auth/fetchallusers
  useEffect(async () => {
    let users = await fetchAllUsers();
    setusers(users);
  }, []);

  return (
    <div className={classes.Container}>
      <div>
        <h6 className={classes.Header}>Top Registered Users</h6>
      </div>
      {users.map((item, i) => {
        return (
          <div onClick={() => {
            navigate(`/u/user?id=${item._id}`)
          }} className={classes.TopUser}>
            <div>
              <h6
                style={{
                  margin: "0",
                  marginLeft: "10px",
                  color: `${i < 3 ? "#f59f00" : "#868e96"}`,
                }}
              >
                {i + 1}
              </h6>
            </div>
            <div>
              <img src={item.pfp} height={30} width={30} />
              <h6>{item.name}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopUsers;
