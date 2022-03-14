import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dataContext from "../Context.js/dataContext";
import classes from "./userprofile.module.css";
import userimage from "../../Images/user.png";
import education from "../../Images/education.png";
import home from "../../Images/home.png";
import facebook from "../../Images/facebook.png";
import linkedin from "../../Images/linkedin.png";
import HotPosts from "../CreatePost/HotPosts";
import Axios from "axios";
import UserContribution from "./UserContributions/UserContribution";

const UserProfile = () => {
  const context = useContext(dataContext);
  const fetchUserInfo = context.fetchUserInfo;
  const fetchUserSpecificBlog = context.fetchUserSpecificBlog;
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [userblog, setuserblog] = useState([]);
  const [user, setUser] = useState({});
  const [bio, setbio] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [saveChange , setSaveChange ] = useState(false)
  const [pfp, setpfp] = useState("");

  

  console.log(id);
  console.log(bio);
 

  useEffect(async () => {
    const userid = await fetchUserInfo(id);
    const { success, userblog } = await fetchUserSpecificBlog(id);
    console.log(userblog);
    setuserblog(userblog);
    setUser(userid);

    console.log(userid);
  }, []);

  console.log(userblog);

  console.log(bio);

  const EditProfile = async () => {
    let success = false;
    const response = await fetch(`http://localhost:5000/api/auth/edituser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        pfp: pfp,
        bio: bio,
      }),
    });
    const json = await response.json();
    success = true;
    if(success) {
      window.location.reload()
    }
    console.log(json);
  };

  const uploadImage = (file) => {
    setImageSelected(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mb3hrwz7");

    Axios.post(
      "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
      formData
    ).then((response) => {
      setSaveChange(true)
      console.log(response.data.url);
      setpfp(response.data.url.toString());
    });
  };

  return (
    <>
      <div className="container">
        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <div className={classes.SideBar} style={{ maxWidth: "320px" }}>
            <img
              style={{ borderRadius: "50%" }}
              src={user.pfp}
              height={300}
              width={300}
            />
            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
              <h3 style={{ margin: 0 }}>{user.name}</h3>
              <p style={{ color: "#868e96", fontSize: "18px" }}>@{user?.name?.split(" ")?.join("-").toLowerCase()}</p>
              <p>{user.bio}</p>
              { localStorage.getItem("auth-token") !== null && localStorage.getItem("user") === id ? <button
                onClick={() => {
                  setbio(user.bio);
                }}
                type="button"
                className="btn btn-light"
                data-bs-toggle="modal"
                data-bs-target="#EditProfileModal"
                className={classes.EditProfile}
              >
                Edit Profile
              </button> : null}
              <div className={classes.Follows}>
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    height={20}
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <h6>2</h6>
                  <p>Followers</p>
                </div>
                <h6 style={{ color: "#868e96" }}>•</h6>
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <h6>2</h6>
                  <p>following</p>
                </div>
              </div>
            </div>
            <div className={classes.Contributions}>
              <h6>Contributions</h6>
              <UserContribution/>
            </div>
          </div>
          <div className={classes.Seperator}>
            <div>
              <div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <h5>Posts</h5>
                  <h5>Contributions</h5>
                </div>
              </div>
              { userblog.length > 0 ?userblog.map((item, i) => {
                return (
                  <div key={item._id}>
                    <HotPosts
                    key={item._id}
                      title={item.title}
                      description={item.description}
                      id={item._id}
                      username={item.username}
                      user={item.user}
                      likes={item.likes}
                      tag={item.tag}
                    />
                  </div>
                );
              }) : <h2 style={{marginTop: "20px"}}>No Posts</h2>}
            </div>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: "#f8f9fa" }}>
        <div className={classes.UserProfile}>
          <div className={classes.UserHeader}></div>
        </div>
      </div>

      <div
        class="modal fade "
        id="EditProfileModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div style={{ border: "none" }} class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Profile
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <h6 style={{ marginBottom: "10px" }}>Upload Profile Picture</h6>
              <div style={{ paddingBottom: "20px" }} class="input-group mb-3">
                <label class="input-group-text" for="inputGroupFile01">
                  Upload
                </label>
                <input
                  onChange={(e) => {
                    uploadImage(e.target.files[0]);
                  }}
                  type="file"
                  class="form-control"
                  id="inputGroupFile01"
                />
              </div>
              <img height={90} src={pfp} />
              <h6 style={{ marginBottom: "10px" }}>Edit Bio</h6>
              <div class="mb-3">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  value={bio}
                  rows="3"
                  onChange={(e) => {
                    setbio(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              { saveChange ? <button
                onClick={EditProfile}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button> : null }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
