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
        }}
      >
        <svg
        style={{marginLeft: "20px"}}
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#fff"
          height={18}
        >
          <path
            fill-rule="evenodd"
            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          // className={classes.LoginNav}
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="#fff"
          height={18}
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
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
