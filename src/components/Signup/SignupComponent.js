import React, { useContext, useState } from "react";
import dataContext from "../Context.js/dataContext";
import classes from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import user from "../../Images//user.png";
import edubytes from "../../Images/edubytes.png";

const SignupComponent = () => {
  const navigate = useNavigate();
  const context = useContext(dataContext);
  const signuperror = context.signuperror
  const setSignupError = context.setSignupError
  const redirectuser = context.redirectuser;
  const getUserAndRedirect = context.getUserAndRedirect;
  const Signup = context.Signup;
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [checked, setChecked] = useState(false);
  

  

  

  const showError = () => {
    setTimeout(() => {
      setSignupError("");
    }, 1500);
    return <p style={{color: "red"}}>{signuperror}</p>
  }

  const createuser = async () => {
    
    let success = await Signup(name, email, password);
    
    if (success) {
      let user = await getUserAndRedirect(localStorage.getItem("auth-token"));
      
      localStorage.setItem("user", user.json.userId);
      navigate(`/u/user?id=${user.json.userId}`);
    }
  };

  return (
    <div style={{ margin: "auto", width: "300px" }}>
      <img className={classes.Logo} src={edubytes} height={50} />
      <div className={classes.Signup}>
        <h4 style={{ marginBottom: "30px" }}>Create a EduBytes Account</h4>
        <p>
          Engage in Informative Forums for O & A Level Students. Want guidance
          for your education in the future? Do it all with EduBytes
        </p>
        <form style={{ marginTop: "50px" }}>
          <div class="mb-4">
            <input
              placeholder="Name"
              type="text"
              class="form-control"
              id="username"
              aria-describedby="emailHelp"
              onChange={(e) => {
                setname(e.target.value);
              }}
              required
            />
          </div>
          <div class="mb-4">
            {signuperror !== "" ?  showError() : null }
            <input
              placeholder="Email"
              type="email"
              class="form-control"
              id="email"
              aria-describedby="emailHelp"
              required
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
          </div>
          <div class="mb-4">
            <input
              placeholder="Password"
              type="password"
              class="form-control"
              id="password"
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </div>
          <div class="mb-4 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
              style={{ width: "15px" }}
              onChange={() => setChecked(!checked)}
            />
            <label
              style={{
                maxWidth: "380px",
                fontSize: "10px",
                marginRight: "50px",
                color: "#495057",
              }}
              class="form-check-label"
              for="exampleCheck1"
            >
              By clicking Create Account , you agree to our Terms and have
              acknowleged our Privacy Policies
            </label>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              createuser();
            }}
            type="submit"
            class="btn"
            disabled={
              (checked === true && name.length >= 5 && password.length >= 5) ===
              true
                ? false
                : true
            }
          >
            Create An Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupComponent;
