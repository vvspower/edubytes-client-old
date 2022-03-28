import React, { useContext, useState } from "react";
import dataContext from "../../Context.js/dataContext";

const DeleteConfirmationModal = (props) => {
  const context = useContext(dataContext);
  const [success, setsuccess] = useState(false);
  const DeleteAd = context.DeleteAd;
  const currentAdId = context.currentAdId;
  const setCurrentAdId = context.setCurrentAdId;

  const handleConfirm = () => {
    const success = DeleteAd(currentAdId);
    if (success) {
      setsuccess(success);
    }
  };

  return (
    <div>
      <div
        class="modal fade "
        id="deleteAd"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div style={{ border: "0" }} class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Confirm
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div style={{ border: "0" }} class="modal-body">
              { !success ? <p>Are you sure you want to delete this?</p> : null}
              {success ? (
                <div class="alert alert-success" role="alert">
                  Ad Deleted
                </div>
              ) : null}
            </div>
            <div style={{ border: "0" }} class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              { !success ? <button
                onClick={handleConfirm}
                style={{ backgroundColor: "#ff922b", color: "white" }}
                type="button"
                class="btn "
              >
                Confirm
              </button> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
