import React, { useContext, useEffect, useState, useRef } from "react";
import LoadingBar from "react-top-loading-bar";
import AdCarousel from "../Advertisement/AdCarousel";
import classes from "./upload.module.css";
import Carousel from "react-multi-carousel";
import Ad from "../Advertisement/Ad";
import { FileUploader } from "react-drag-drop-files";
import pdf from "../../Images/pdf.png";
import detail from "../../Images/adddetail.png";
import list from "../../Images/to-do-list.png";
import dataContext from "../Context.js/dataContext";
import spinning from "../../Images/spin-loading.gif";

const UploadNote = () => {
  const inputFileRef = useRef();
  const context = useContext(dataContext);
  const Notes = context.Notes;
  const fetchResources = context.fetchResources;
  const uploadNoteSuccess = context.uploadNoteSuccess;
  const setUploadNoteSuccess = context.setUploadNoteSuccess;
  const [progress, setProgress] = useState(30);
  const [file, setFile] = useState(null);
  const [nextPage, setnextPage] = useState(false);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [subject, setsubject] = useState("");
  const [type, settype] = useState("");
  const [driveLink, setdriveLink] = useState("");
  const [loading, setloading] = useState(false);

  const Contribute = context.Contribute;

  console.log(title, desc, subject, type);
  console.log(Contribute);

  const handleChange = (e) => {
    setloading(true);
    var file = e.target.files[0]; //the file
    setFile(file);
    var reader = new FileReader(); //this for convert to Base64
    reader.readAsDataURL(e.target.files[0]); //start conversion...
    reader.onload = function (e) {
      //.. once finished..
      var rawLog = reader.result.split(",")[1]; //extract only thee file data part
      var dataSend = {
        dataReq: { data: rawLog, name: file.name, type: file.type },
        fname: "uploadFilesToGoogleDrive",
      }; //preapre info to send to API
      fetch(
        "https://script.google.com/macros/s/AKfycbzahMBn4ZbghLAMQG2zCLMd1f7PuxDDSVOr7DreZ9U1kD4rD48W8oo-nLJVbq7g2eP-bg/exec", //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }
      ) //send to Api
        .then((res) => res.json())
        .then((a) => {
          console.log(a); //See response
          setloading(false);

          setdriveLink(a.url);
          setnextPage(true);
        })
        .catch((e) => console.log(e)); // Or Error in console
    };
  };

  const ContributeAPI = () => {
    Contribute(title, driveLink, type, subject);
  };

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

  useEffect(() => {
    setProgress(100);
    fetchResources();
  }, []);

  return (
    <div>
      <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="container">
        <div className={classes.Contribute}>
          <div>
            <div className={classes.Header} style={{ fontWeight: "500" }}>
              <h1>Contribute</h1>
              <p style={{ color: "#845ef7" }}>
                Upload Notes , Book PDFs , Study Guides or any useful material
                to help out the community
              </p>
              <p style={{ color: "#ced4da", fontSize: "12px" }}>
                * Currently this platform only supports O/A Level Resources
              </p>
            </div>

            {uploadNoteSuccess ? (
              <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Success</h4>
                <p>
                  Your PDF has successfully been uploaded. Thank you so much for
                  the Contribution. Your work will be appreciated!
                </p>
                <hr />
                <p class="mb-0">You will be redirected in</p>
              </div>
            ) : (
              <div className={classes.Form}>
                {!nextPage ? (
                  <div className={classes.Drag}>
                    {localStorage.getItem("auth-token") ? (
                      <div class="mb-3">
                        {!loading ? (
                          <div style={{ marginTop: "40px" }}>
                            <input
                              style={{ display: "none" }}
                              onChange={(e) => handleChange(e)}
                              // class="form-control"
                              // ref="fileInput
                              type="file"
                              id="formFile"
                            />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "40px",
                              }}
                            >
                              <label
                                className={classes.FileUpload}
                                for="formFile"
                              >
                                Upload
                              </label>
                              <h6>Upload PDF Here</h6>
                            </div>
                          </div>
                        ) : null}
                        {loading ? (
                          <img
                            style={{ marginTop: "50px" }}
                            height={30}
                            src={spinning}
                          />
                        ) : null}
                      </div>
                    ) : (
                      <div
                        style={{ maxWidth: "300px", margin: "0 auto" }}
                        class="alert alert-danger"
                        role="alert"
                      >
                        Please Log in to Continue
                      </div>
                    )}
                  </div>
                ) : null}
                {nextPage ? (
                  <div className={classes.AddDetails}>
                    <h3>Add Details</h3>
                    <div class="mb-3">
                      <input
                        onChange={(e) => {
                          settitle(e.target.value);
                        }}
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter title"
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        onChange={(e) => {
                          settype(e.target.value);
                        }}
                        type="email"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Resource Type"
                      />
                    </div>
                    <div>
                      <input
                        class="form-control"
                        list="datalistOptions"
                        id="exampleDataList"
                        placeholder="Enter Subject"
                        onChange={(e) => {
                          setsubject(e.target.value);
                        }}
                      />
                      <datalist id="datalistOptions">
                        <option value="San Francisco" />
                        <option value="New York" />
                        <option value="Seattle" />
                        <option value="Los Angeles" />
                        <option value="Chicago" />
                      </datalist>
                    </div>
                    <div>
                      <button
                        onClick={ContributeAPI}
                        type="button"
                        className="btn btn-secondary"
                        style={{ backgroundColor: "#ff922b", border: "none" }}
                      >
                        Contribute
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            <div className={classes.Bottom}>
              <div>
                <img src={pdf} height={120} />
                <h6>1. Upload PDF.</h6>
                <p>
                  {" "}
                  You can convert your Images into PDF using CamScanner on you
                  Mobile Phone
                </p>
              </div>
              <div>
                <img src={detail} height={120} />
                <h6>2. Add Details</h6>
                <p>
                  {" "}
                  Such as the Title of the Notes, The Authors or any relevant
                  stuff
                </p>
              </div>
              <div>
                <img src={list} height={120} />
                <h6>3. Contributors List</h6>
                <p>
                  Your work will be appreciated and would be shown on the
                  contributors list
                </p>
              </div>
            </div>
          </div>

          <div className={classes.PopularNotesContainer}>
            <h5 className="mb-4">Popular Notes</h5>
            {Notes.map((item, i) => {
              return (
                <a href={item.link} target="_blank">
                  <div className={classes.PopularNotes}>
                    <h6>{item.name}</h6>
                    <p>{item.subject}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNote;
