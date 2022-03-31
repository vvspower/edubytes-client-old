import React, { useState, useContext } from "react";
import classes from "./auth.module.css";
import dataContext from "../Context.js/dataContext";
import { useNavigate } from "react-router-dom";
import logo from '../../Images/edubytes.png'

const LoginModal = () => {
  const navigate = useNavigate()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const context = useContext(dataContext);
  const autherrors = context.autherrors;
  const setautherrors = context.setautherrors;
  

  const LoginUser = context.LoginUser;
  const [display, setdisplay] = useState("inlineBlock");

  

  const showError = () => {
    setTimeout(() => {
      setautherrors(null);
    }, 1500);

    return <p style={{ color: "red", display: display }}>{autherrors.error}</p>;
  };


  const something=(event)=> {
    if (event.keyCode === 13) {
      LoginUser(email, password);
      login();
    }
}

  const login = () => {};

  

  return (
    <div className={classes.AuthModal}>
      <div
        class="modal fade"
        id="Login"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div className={classes.Modal}>
            <div
              style={{
                borderRadius: "15px",
                maxWidth: "350px",
              }}
              class="modal-content"
            >
              <div style={{ border: "0" }} class="modal-header">
                <img className={classes.LogoIMG} src={logo} />
                <button
                  style={{ marginLeft: "10px" }}
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <h6 style={{marginBottom: "20px" , fontSize:"14px" , textAlign: "center"}}>Login with email and password</h6>

                <div class="mb-3 mt-2">
                  {autherrors?.error ? showError() : null}
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    onKeyDown={(e) =>
                      {something(e)} }
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setpassword(e.target.value);
                    }}
                    onKeyDown={(e) =>
                      {something(e)} }
                  />
                </div>

                <button
                  style={{
                    width: "250px",
                    backgroundColor: "#212529",
                    marginLeft: "30px",
                  }}
                  type="submit"
                  class="btn btn-secondary"
                  onClick={() => {
                    LoginUser(email, password);
                    login();
                  }}
                >
                  Log in
                </button>
                <p className={classes.Create}>
                  Dont have an Account? <button type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#Login" style={{border: "0" , backgroundColor: "#fff", padding: "0" }} onClick={()=> navigate("/signup")}>Create one</button>
                </p>
              </div>
              <div style={{ border: "0" }} class="modal-footer">
                <div className={classes.Terms}>
                  <p>
                    By Signing in or Registering you agree to the
                    <span>" Terms Of Service "</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
