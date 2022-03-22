import React, { useEffect, useContext, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import dataContext from "../Context.js/dataContext";
import infinity from "../../Images/infinity.svg";
import classes from "./userpost.module.css";
import like from "../../Images/like.png";
import likeamount from "../../Images/likeamount.png";
import pencil from "../../Images/pencil.png";
import user from "../../Images/user.png";
import DeleteUserPostModal from "./DeleteUserPostModal";

const UserPost = () => {
  let dp;
  const context = useContext(dataContext);
  const BlogById = context.blogById;
  // checkifliked,
  // isliked,
  const checkifliked = context.checkifliked;
  const isliked = context.isliked;
  const setisliked = context.setisliked;
  const PostReply = context.PostReply;
  const replies = context.replies;
  const setreplies = context.setreplies;
  const fetchReplies = context.fetchReplies;
  const replysuccess = context.replysuccess;
  const fetchBlogById = context.fetchBlogById;
  const [searchParams, setSearchParams] = useSearchParams();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const userid = new URLSearchParams(search).get("user");
  const [success, setSuccess] = useState(false);
  const [acronym, setacronym] = useState(".");
  const [tags, setTags] = useState([]);
  const [reply, setreply] = useState("");
  const [showreply, setshowreply] = useState(false);
  const [commentclicked, setcommentclicked] = useState(false);
  const [postlikes, setpostlikes] = useState(0);
  const [pfp, setpfp] = useState("");
  const [blogid, setblogid] = useState(null);
  const [replypfp, setreplypfp] = useState("");
  const date = new Date(BlogById.date);

  const address = "http://localhost:5000"

  console.log("///////////////");
  console.log(replies);
  console.log("///////////////");

  console.log(userid);

  const getPfp = async () => {
    console.log(id);

    const response = await fetch(
      `${address}/api/auth/getusernoauth/${userid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);

    setpfp(json.pfp);
    console.log(json.pfp);
    return json.pfp;
  };

  const getPfpreply = async (user) => {
    console.log(user);
    const response = await fetch(
      `${address}/api/auth/getusernoauth/${user}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);

    setreplypfp(json.pfp);
    return json.pfp;
  };

  useEffect(async () => {
    console.log("gegeg");
    console.log(id);
    fetchReplies(id);
    console.log(BlogById);
    const success = await fetchBlogById(id);
    setSuccess(success);
    if (localStorage.getItem("auth-token") !== null) {
      checkifliked(id);
    }
    setblogid(BlogById);
    getPfp(userid);
  }, []);

  console.log(BlogById.user);
  console.log(blogid);

  const likepostapi = async (id) => {
    const response = await fetch(
      `${address}/api/app/likepost/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  const unlikepostapi = async (id) => {
    const response = await fetch(
      `${address}/api/app/unlikepost/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      }
    );
    const json = await response.json();
    console.log(json);
  };

  const likepost = () => {
    if (isliked === false) {
      likepostapi(BlogById._id);
      setpostlikes(postlikes + 1);
    }

    if (isliked === true) {
      unlikepostapi(BlogById._id);
      setpostlikes(postlikes - 1);
    }

    setisliked(!isliked);
  };
  console.log(reply);

  const replyToPost = () => {
    PostReply(BlogById._id, reply);
  };

  console.log(BlogById._id);

  console.log(tags);

  console.log(BlogById);
  console.log(success);
  console.log(tags);
  if (BlogById === {}) {
    return false;
  }

  return (
    <div className={classes.Universal} style={{ marginTop: "20px" }}>
      <DeleteUserPostModal id={BlogById._id}/>
      {BlogById?.user !== undefined ? (
        <div className="container">
          {success ? (
            <div className={classes.Container}>
              <div>
                <div className={classes.UserPost}>
                  <div className={classes.Breadcrumb}>
                    <nav
                      style={{ borderBottom: "1px solid #e9ecef" }}
                      aria-label="breadcrumb"
                    >
                      <ol style={{ marginBottom: "2px" }} class="breadcrumb">
                        <li class="breadcrumb-item">
                          <a href="#">Home</a>
                        </li>
                        <li class="breadcrumb-item " aria-current="page">
                          <a href="#">discuss</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                          {BlogById.title.substring(0, 30)}...
                        </li>
                      </ol>
                    </nav>
                  </div>
                  <div className={classes.Title}>
                    <img
                      style={{ borderRadius: "50%" }}
                      src={pfp}
                      height={30}
                      width={30}
                      alt="sus"
                    />
                    <h5>{BlogById.title}</h5>
                  </div>
                  <div className={classes.Content}>
                    <div>
                      <span>{BlogById.username}</span>
                      <span>•</span>
                      <span>{date.toLocaleString()}</span>
                    </div>
                    {BlogById.image !== "" ? (
                      <div>
                        <img
                        width="99%"
                          className={classes.postImage}
                          src={BlogById.image}
                        />
                      </div>
                    ) : null}
                    <p
                      style={{
                        marginTop: "10px",
                        whiteSpace: "pre-line",
                        verticalAlign: "bottom  ",
                        paddingBottom: "20px",
                      }}
                    >
                      {BlogById.description}
                    </p>
                  </div>
                  <div className={classes.Interaction}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "22px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        { localStorage.getItem("auth-token") ?  <div>
                          <svg
                            onClick={() => {
                              likepost();
                            }}
                            style={{
                              backgroundColor: "#e9ecef",
                              padding: "3px",
                              borderRadius: "50px",
                              cursor: "pointer",
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill={isliked ? "#4263eb" : " #adb5bd"}
                            // #4263eb
                            height={22}
                          >
                            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                          </svg>
                        </div> : <p style={{color: "white"}}>.</p>}
                        <img
                          style={{ marginLeft: "5px" }}
                          src={likeamount}
                          height="20px"
                        />
                        <p>{BlogById?.likes?.length}</p>
                      </div>

                      {/* <span className={classes.ReportBtn}>...</span> */}
                      <div className={classes.Buttons}>
                        <svg
                          style={{ cursor: "pointer" }}
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="#adb5bd"
                          height={18}
                        >
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                        <span style={{ marginLeft: "4px", fontSize: "12px" }}>
                          Share
                        </span>
                      </div>
                      { BlogById.user === localStorage.getItem("user") ?
                        <div className={classes.Buttons}>
                          <button data-bs-toggle="modal" data-bs-target="#delete_modal" style={{backgroundColor: "white" , border: "0" , width: "20px"}}>
                            <svg
                              style={{ cursor: "pointer" }}
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="#adb5bd"
                              height={20}
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                          <span style={{ marginLeft: "4px", fontSize: "12px" }}>
                            Delete
                          </span>
                        </div>
                      : null}
                    </div>

                    {showreply === false ? (
                      localStorage.getItem("auth-token") ? <div className={classes.Reply}>
                        <button
                          onClick={() => {
                            setshowreply(true);
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#replyModal"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            height="20px"
                            style={{ marginRight: "5px" }}
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                          Reply to discussion
                        </button>
                      </div> : <p>Log in to Reply</p>
                    ) : null}
                  </div>
                </div>
                {showreply ? (
                  <div className={classes.ReplyModal}>
                    <textarea
                      style={{ borderRadius: "20px" }}
                      onChange={(e) => {
                        setreply(e.target.value);
                      }}
                      type="text"
                      class="form-control"
                      // id="exampleInputEmail1"
                      // aria-describedby="emailHelp"
                      placeholder="Reply"
                    />
                    <button
                      onClick={() => {
                        setshowreply(false);
                      }}
                      style={{ backgroundColor: "#adb5bd" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        replyToPost();
                        setshowreply(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        height="20px"
                        style={{ marginRight: "5px" }}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                      Reply
                    </button>
                  </div>
                ) : null}
                <div className={classes.ReplyNum}>
                  {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
                </div>
                {replysuccess ? (
                  <div>
                    {replies.map((item, id) => {
                      const datecomment = new Date(item.date);

                      return (
                        <div className={classes.ReplyCards}>
                          <div
                            className={classes.UserInfo}
                            style={{ justifyContent: "space-between" }}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <img
                                style={{ borderRadius: "50%" }}
                                src={item.pfp}
                                height={30}
                                width={30}
                              />
                              <span>{item.name}</span>
                            </div>
                            <span>{datecomment.toLocaleString()}</span>
                          </div>
                          <div
                            style={{
                              borderBottom: "1px solid #eee",
                              paddingBottom: "15px",
                            }}
                          >
                            <p>{item.reply}</p>
                          </div>
                          <aside>
                            <div
                              style={{
                                display: "flex",
                                gap: "22px",
                                alignItems: "center",
                              }}
                            >
                              <div style={{ display: "flex", gap: "5px" }}>
                                <svg
                                  style={{
                                    backgroundColor: "#e9ecef",
                                    padding: "3px",
                                    borderRadius: "50px",
                                  }}
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="#adb5bd"
                                  //#4263eb
                                  height={22}
                                >
                                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                <span>0</span>
                              </div>
                              <div>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="#adb5bd"
                                  height={18}
                                >
                                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                                <span>Share</span>
                              </div>
                            </div>
                            <div>
                              <span style={{ margin: "0" }}>Report</span>
                            </div>
                          </aside>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className={classes.ExtraInfo}>
                <div style={{ borderBottom: "1px solid #e9ecef " }}>
                  <div className={classes.Info}>
                    <p>Likes</p>
                    <span>{BlogById?.likes?.length}</span>
                  </div>
                  <div className={classes.Info}>
                    <p>Number of particpants</p>
                    <span>0</span>
                  </div>
                  <div className={classes.Info}>
                    <p>Views</p>
                    <span>0</span>
                  </div>
                </div>
                <div className={classes.Tags}>
                  <span>Related Tags</span>
                  <div
                    style={{ display: "flex", gap: "10px", marginTop: "10px" }}
                  >
                    {BlogById.tag.split(",").map((item, i) => {
                      return <p className={classes.TagItem}>{item}</p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <img
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                margin: "-100px 0 0 -100px",
              }}
              src={infinity}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserPost;
