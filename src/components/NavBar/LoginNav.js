import React, { useState, useContext, useEffect } from "react";
import classes from "./nav.module.css";
import UserModal from "./UserModal";
import dataContext from "../Context.js/dataContext";

const LoginNav = () => {
  const context = useContext(dataContext);
  const loggedUser = context.loggedUser;
  const fetchUserWithAuth = context.fetchUserWithAuth;
  const clickuser = context.clickuser;
  const setclickuser = context.setclickuser;

  useEffect(() => {
    fetchUserWithAuth(localStorage.getItem("auth-token"));
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "20px",
          paddingLeft: "10px"
        }}
      >
        <img
          className={classes.ClickUser}
          onClick={() => {
            setclickuser(!clickuser);
          }}
          src={loggedUser?.user?.pfp}
          height={20}
          width={20}
        />
      </div>
      <div>{clickuser ? <UserModal /> : null}</div>
    </>
  );
};

export default LoginNav;
