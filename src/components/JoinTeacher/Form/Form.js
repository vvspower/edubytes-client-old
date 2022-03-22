import React from "react";
import classes from "./Form.module.css";

const Form = () => {
  return (
    <div className={classes.Container}>
      <form className="was-validated">
        <div className="d-flex justify-content-between">
          <div class=" form-check mb-3">
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="First name"
              required
            />
            <div class="invalid-feedback">
              Please enter a message in the textarea.
            </div>
          </div>
          <div class=" form-check mb-3">
          <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Last name"
              required
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
          <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Institution"
              required
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
          <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Subject"
              required
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
          <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Fees"
              required
            />
          </div>
        </div>
        <div class=" form-check mb-3">
          <input
            type="file"
            class="form-control"
            aria-label="file example"
            required
          />
          <div class="invalid-feedback">Please select a file</div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
