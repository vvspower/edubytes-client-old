import React, { useContext, useState } from "react";
import dataContext from "../Context.js/dataContext";
import { useNavigate } from "react-router-dom";
import spinner from "../../Images/delete-loader.gif";

const DeleteUserPostModal = (props) => {
  const navigate = useNavigate();
  const context = useContext(dataContext);
  const DeleteBlog = context.DeleteBlog;
  const [deleteSuccess, setdeleteSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  console.log(props.id);

  const DeleteHandler = () => {
    setloading(true);
    const success = DeleteBlog(props.id);
    if (success) {
      setloading(false);
      let redirect = setTimeout(() => {
          navigate("/")
          window.location.reload()
        clearTimeout(redirect)
    
      }, 2000);
      
    }
    setdeleteSuccess(success);

  
  };
  return (
    <div>
      <div
        class="modal fade"
        id="delete_modal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class=" modal-dialog modal-dialog-centered ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Delete Post
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this post?{" "}
            </div>
            { deleteSuccess ? <div class="alert alert-success" role="alert">
              Post Deleted Successfully
              <br/>
              <span style={{fontSize: "12px"}}>You are being redirected</span>
            </div> : null}
            {loading ? (
              <img src={spinner} height={20} />
            ) : (
              <div class="modal-footer">
                {deleteSuccess ? null : (
                  <div>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={DeleteHandler}
                      type="button"
                      class="btn btn-primary mx-2"
                    >
                      Delete
                    </button>{" "}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPostModal;
