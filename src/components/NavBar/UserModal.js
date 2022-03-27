import React, { useContext } from "react";
import classes from "./nav.module.css";
import dataContext from "../Context.js/dataContext";
import { useNavigate } from "react-router-dom";
import user from "../../Images/user.png";

const UserModal = () => {
  const navigate = useNavigate();
  const context = useContext(dataContext);
  const setclickuser = context.setclickuser;

  const loggedUser = context.loggedUser;
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");

    navigate("/")
    window.location.reload();
  };
  console.log(loggedUser);

  return (
    <div>
      <div
        style={{
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
          borderRadius: "8px"
        }}
        className={classes.UserModal}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "0px 0px 0px 0px",
            borderBottom: "1px solid #e9ecef",
          }}
        >
          <div
            onClick={() => {
              navigate(`/u/user?id=${loggedUser.userId}`);
              setclickuser(false);
            }}
            // className={classes.Buttons}
            className={classes.Loggedname}
          >
            <img
              src={loggedUser.user.pfp}
              height={60}
              width={60}
              style={{ borderRadius: "50%" }}
            />
            <div>
              <p>{loggedUser.user.name}</p>
              <p style={{ fontSize: "12px" }}>See your Profile</p>
            </div>
          </div>
        </div>
        <div>
          <div className={classes.Buttons}>
            <svg
              style={{ opacity: "0.6" }}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height={20}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p
              onClick={() => {
                navigate(`/u/user?id=${loggedUser.userId}`);
                setclickuser(false);
              }}
            >
              Your notes
            </p>
          </div>
          <div className={classes.Buttons}>
            <svg
              style={{ opacity: "0.6" }}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height={20}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p onClick={() => {
                navigate(`/u/user?id=${loggedUser.userId}`);
                setclickuser(false);
              }}>Your questions</p>
          </div>
          <div className={classes.Buttons}>
            <svg
              style={{ opacity: "0.6" }}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height={20}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <p onClick={() => {
                navigate(`/u/user?id=${loggedUser.userId}`);
                setclickuser(false);
              }}>Likes</p>
          </div>
          <div
            onClick={() => {
              
              logout();
              
            }}
            className={classes.Buttons}
          >
            <svg
              style={{ opacity: "0.6" }}
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              height={20}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
