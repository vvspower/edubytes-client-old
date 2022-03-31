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
import Carousel from "react-multi-carousel";
import Ad from "./AdComponent/Ad";
import DeleteConfirmationModal from "./AdComponent/DeleteConfirmationModal";
import loader from "../../Images/default-loading.gif";
import LoadingBar from "react-top-loading-bar";

const UserProfile = () => {
  const context = useContext(dataContext);
  const userAds = context.userAds;
  const fetchUserAds = context.fetchUserAds;
  const fetchUserInfo = context.fetchUserInfo;
  const fetchUserSpecificBlog = context.fetchUserSpecificBlog;
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const [userblog, setuserblog] = useState([]);
  const [user, setUser] = useState({});
  const [bio, setbio] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [saveChange, setSaveChange] = useState(false);
  const [pfp, setpfp] = useState("");
  const [loading, setloading] = useState(false);
  const [saving, setsaving] = useState(false);
  const [progress, setProgress] = useState(30)

  const address = "https://project1400authapi.herokuapp.com";

  
  

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(async () => {
    const userid = await fetchUserInfo(id);
    const { success, userblog } = await fetchUserSpecificBlog(id);
    
    setuserblog(userblog);
    setUser(userid);
    setProgress(100)
    
    fetchUserAds(id);
    
  }, []);
  
  


  const EditProfile = async () => {
    setsaving(true);
    let success = false;
    const response = await fetch(`${address}/api/auth/edituser`, {
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
    if (success) {
      window.location.reload();
      setsaving(true);
    }
    
  };

  const uploadImage = (file) => {
    setloading(true);
    setImageSelected(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mb3hrwz7");

    Axios.post(
      "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
      formData
    ).then((response) => {
      setSaveChange(true);
      
      setpfp(response.data.url.toString());
      setloading(false);
    });
  };

  return (
    <>
      <div className="container">
      <LoadingBar
        height={3}
        color="#8ce99a"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
        <DeleteConfirmationModal />
        <div className={classes.Container}>
          <div className={classes.SideBar}>
            { user.length !== 0 ?
              <div className={classes.InnerSideBar}>
                <img
                  className={classes.UserImage}
                  style={{ borderRadius: "50%" }}
                  src={user.pfp}
                  height={300}
                  width={300}
                />
                <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                  <h3 style={{ margin: 0 }}>{user.name}</h3>
                  <p style={{ color: "#868e96", fontSize: "14px" }}>
                    @{user?.name?.split(" ")?.join("-").toLowerCase()}
                  </p>
                  <p>{user.bio}</p>
                  {localStorage.getItem("auth-token") !== null &&
                  localStorage.getItem("user") === id ? (
                    <button
                      onClick={() => {
                        setbio(user.bio);
                      }}
                      type="button"
                      // className="btn btn-light"
                      data-bs-toggle="modal"
                      data-bs-target="#EditProfileModal"
                      className={classes.EditProfile}
                    >
                      Edit Profile
                    </button>
                  ) : null}
                  <div className={classes.Follows}>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        height={15}
                      >
                        <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                      </svg>
                      <h6>{user?.likes}</h6>
                      <p>Liked</p>
                    </div>
                    <h6 style={{ color: "#868e96" }}>•</h6>
                  </div>
                </div>
                <div className={classes.Contributions}>
                  <h6>Contributions</h6>
                  <UserContribution />
                </div>
              </div>
            : <img src={loader} height={30}/>}
          </div>
          <div className={classes.ContributionsMobile}>
            <h6>Contributions</h6>
            <aside>
              <UserContribution />
            </aside>
          </div>
          <div className={classes.Seperator}>
            <div>
              <div>
                <div style={{ display: "flex", gap: "20px" }}>
                  <h5>Posts</h5>
                  <h5>Contributions</h5>
                </div>
              </div>
              {userblog?.length > 0 ? (
                userblog?.map((item, i) => {
                  return (
                    <div>
                      <HotPosts
                        title={item.title}
                        description={item.description}
                        id={item._id}
                        username={item.username}
                        user={item.user}
                        likes={item.likes.length}
                        tag={item.tag}
                      />
                    </div>
                  );
                })
              ) : (
                <h2 style={{ marginTop: "20px" }}>No Posts</h2>
              )}
              {localStorage.getItem("auth-token") !== null &&
              localStorage.getItem("user") === id ? (
                <div className={classes.AdSection}>
                  <Carousel
                    itemClass="carousel-item-padding-0-px"
                    centerMode={true}
                    autoPlaySpeed={50000000}
                    responsive={responsive}
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    partialVisible={false}
                  >
                    {userAds?.map((item, i) => {
                      return (
                        <div>
                          <Ad
                            name={item.name}
                            institution={item.institution}
                            image={item.image}
                            subject={item.subject}
                            fees={item.price}
                            contact={item.contact}
                            id={item._id}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              ) : null}
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
              {!saveChange ? (
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              ) : null}
              {saveChange ? (
                <button onClick={EditProfile} className="btn btn-primary">
                  Save changes
                </button>
              ) : null}
              {loading ? (
                <p>Please wait till your Profile Picture gets uploaded</p>
              ) : null}
              {saving ? <img height={20} src={loader} /> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
