import React, { useContext, useEffect, useState } from "react";
import classes from "./post.module.css";
import TopCard from "./TopCard";
import notes from "../../Images/notes.png";
import teach from "../../Images/teach.png";
import ContributeCard from "../Contribute/ContributeCard";
import post from "../../Images/write.png";
import dataContext from "../Context.js/dataContext";
import LatestNotes from "../LatestNotes/LatestNotes";
import HotPosts from "./HotPosts";
import TopUsers from "./TopUsers/TopUsers";
import InteractionBar from "./PostComponents/InteractionBar";
import TopTags from "./TopTags/TopTags";
import LoadingBar from "react-top-loading-bar";
import feedback from "../../Images/feedback.png";
import PostModal from "./PostModal/PostModal";

// This is the Discuss Page on the Web App.
// From this page user can post Questions

const CreatePostModal = () => {
  const context = useContext(dataContext);
  const setclickuser = context.setclickuser;

  const fetchBlog = context.fetchBlog;
  const blogs = context.blogs;
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    fetchBlog();
    console.log("hello");
    setProgress(100);
  }, []);

  return (
    <div
      onClick={() => {
        setclickuser(false);
      }}
      className="container"
    >
      <LoadingBar
        height={2}
        color="#ffd43b"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className={classes.Universal}>
        <div className={classes.Container}>
          <div className={classes.TopCards}>
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <TopCard title="Get Notes" image={notes} color="white" link="notes" />
              <TopCard title="Start Teaching" image={teach} color="#3ac66b" link="teacher" />
              <ContributeCard />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div className={classes.Post}>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <h6>Feedback</h6>
                    <img
                      style={{ marginLeft: "10px" }}
                      src={feedback}
                      height={20}
                    />
                  </button>
                </div>
                <div
                  className={classes.Post}
                  type="button"
                  // class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <h6>Post a Question</h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.Modal}>
            <PostModal />
          </div>

          <div className={classes.Questions}>
            <div className={classes.Categories}>
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <h6>Hottest</h6>
                <h6>Sort By Likes</h6>
              </div>
              <div className={classes.Search}>
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
              </div>
            </div>
            <div>
              {blogs.map((item, i) => {
                return (
                  // Same as Latest Posts but with different UI and the ability to be sorted.
                  <HotPosts
                    title={item.title}
                    description={item.description}
                    id={item._id}
                    username={item.username}
                    user={item.user}
                    likes={item.likes}
                    tag={item.tag}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className={classes.SideBar}>
          <InteractionBar />
          <div className={classes.TopUser}>
            <h6>Top Contributors</h6>
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
            <TopUsers />
          </div>
          <TopTags />
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
