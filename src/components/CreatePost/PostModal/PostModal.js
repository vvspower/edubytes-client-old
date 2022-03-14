import React, { useState, useContext } from "react";
import dataContext from "../../Context.js/dataContext";
import classes from "./postmodal.module.css";
import Axios from "axios";

// Bootstrap Modal
// Pops up when Post Question button clicked
// Sends API request on PostQuestion in DataState when user clicks Post.
//

const PostModal = () => {
  const context = useContext(dataContext);
  const PostQuestion = context.PostQuestion;
  const [imageSelected, setImageSelected] = useState("");

  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [tags, settags] = useState("");
  const [image, setimage] = useState("");
  const [uploaded, setuploaded] = useState(true)
  console.log(title, desc, tags);

  const uploadImage = (file) => {
    setImageSelected(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mb3hrwz7");

    Axios.post(
      "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
      formData
    ).then((response) => {
      console.log(response.data.url);
      setimage(response.data.url.toString());
      setuploaded(true)
    });
  };

  return (
    <div className={classes.Container}>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div style={{ border: "0" }} class="modal-header">
              <h1 class="modal-title" id="exampleModalLabel">
                Post a Question
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <input
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    type="text"
                    class="form-control"
                    // id="exampleInputEmail1"
                    // aria-describedby="emailHelp"
                    placeholder="Enter topic title..."
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Tag your topic (e.g. Physics,MCQ) "
                    onChange={(e) => {
                      settags(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-3">
                  <textarea
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Write your Question Here.
                    Make sure to Enter 50 characters or more"
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Add an image if you want to:
                  </label>
                  <input
                  onClick={() => {
                    setuploaded(false)
                  }}
                    onChange={(e) => {
                      uploadImage(e.target.files[0]);
                    }}
                    class="form-control"
                    type="file"
                    id="formFile"
                  />
                </div>
                <div>
                  <img height={90} src={image}/>
                </div>
                <div className={classes.Rule}>
                  <div
                    class="alert alert-warning alert-dismissible fade show"
                    role="alert"
                  >
                    Do take a moment to read{" "}
                    <strong>Community Guidelines</strong> before posting.
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="alert"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </form>
            </div>
            <div style={{ border: "0" }} class="modal-footer">
              <button
                style={{
                  borderRadius: "8px",
                }}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              { uploaded ? <button
                onClick={() => {
                  PostQuestion(title, desc, tags , image);
                }}
                style={{
                  backgroundColor: "#ff922b",
                  color: "white",
                  borderRadius: "8px",
                }}
                type="submit"
                class="btn"
              >
                Post Question
              </button> : <p>Please wait for Image Upload</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
