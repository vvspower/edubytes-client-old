import React, { useState, useContext } from "react";
import classes from "./Form.module.css";
import Axios from "axios";
import dataContext from "../../Context.js/dataContext";

const Form = () => {
  const context = useContext(dataContext);
  const fetchAllAds = context.fetchAllAds;
  const Ads = context.Ads;
  const JoinTeacher = context.JoinTeacher;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [institution, setInstitution] = useState("");
  const [subject, setSubject] = useState("");
  const [fees, setFee] = useState("");
  const [contact, setContact] = useState("");
  const [imageSelected, setImageSelected] = useState("");
  const [uploaded, setuploaded] = useState(false);
  const [image, setImage] = useState(true);
  const [success, setsuccess] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    let fullname = firstname + " " + lastname;
    const success = JoinTeacher(
      fullname,
      subject,
      institution,
      contact,
      fees,
      image
    );
    if (success) {
      setuploaded(false);
      setFirstname("");
      setLastname("");
      setInstitution("");
      setSubject("");
      setFee("");
      setContact("");
      setImageSelected(" ");
    }
    setsuccess(success);
  };

  const uploadImage = (file) => {
    setImageSelected(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mb3hrwz7");
    setuploaded(false);

    Axios.post(
      "https://api.cloudinary.com/v1_1/disle0uxb/image/upload",
      formData
    ).then((response) => {
      console.log(response.data.url);
      setImage(response.data.url.toString());
      setuploaded(true);
    });
  };

  console.log(
    (firstname.length > 2 &&
      lastname.length > 2 &&
      subject.length > 4 &&
      contact.length > 10 &&
      uploaded == true &&
      (institution.length > 4 || fees.length > 2)) == false
  );

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
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
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
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Institution ( Not required if  solo )"
              required
              value={institution}
              onChange={(e) => {
                setInstitution(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Subject (Please include the the Board eg. IGCSE or A Level)"
              required
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Fees ( Not required if part of a institution )"
              required
              value={fees}
              onChange={(e) => {
                setFee(e.target.value);
              }}
            />
          </div>
        </div>
        <div>
          <div class=" form-check mb-3">
            <input
              type="text"
              class="form-control"
              id="validationDefault01"
              placeholder="Contact (Your website or facebook Link Preffered)"
              required
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </div>
        </div>
        <div class=" form-check mb-3">
          <input
            type="file"
            class="form-control"
            aria-label="file example"
            onChange={(e) => {
              uploadImage(e.target.files[0]);
            }}
            required
          />
          <div class="invalid-feedback">Upload your image</div>
        </div>
        {/* {uploaded ? ( */}
        <button
          disabled={
            (firstname.length > 2 &&
            lastname.length > 2 &&
            subject.length > 4 &&
            contact.length > 10 &&
            uploaded &&
            (institution.length > 4 || fees.length > 2)) === true ? false : true
          }
          // disabled={false}
          onClick={(e) => {
            handleClick(e);
          }}
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
      
          { (firstname.length > 2 &&
            lastname.length > 2 &&
            subject.length > 4 &&
            contact.length > 10 &&
            uploaded &&
            (institution.length > 4 || fees.length > 2)) === true ? null : <h6>Complete the form </h6>}
        
      </form>
      {success ? (
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Success</h4>
          <span>Your Ad has successfully been posted.</span>
          <hr />
          <span class="mb-0">
            Please refrain from posting multiple ads. Doing this may result in
            your account being terminated.
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Form;
