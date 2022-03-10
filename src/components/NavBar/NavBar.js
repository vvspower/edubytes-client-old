import React from "react";
import PostNav from "./PostNav";
import classes from "./nav.module.css";
import { useNavigate } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import LoginNav from "./LoginNav";
import { useState } from "react";
import Sidebar from "./Sidebar/Sidebar";

const NavBar = () => {
  console.log(localStorage.getItem("auth-token") === null);
  const [clickuser, setclickuser] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={classes.NavBar}>
      <LoginModal />
      <Sidebar />

      <div>
        <nav
          style={{
            backgroundColor: "#212529",
            // height: "40px",
            borderBottom: "1px solid #e9ecef",
          }}
          className="navbar sticky-top navbar-expand-lg navbar-dark py-0  "
        >
          <div style={{ maxWidth: "1100px" }} className="container">
            <a
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
              className="navbar-brand"
            >
              Project
            </a>
            <div className={classes.MobileNavButton}>
              <a
                // class="btn btn-primary"
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <span className="navbar-toggler-icon"></span>
              </a>
            </div>
            {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Discuss
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Notes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contribute
                  </a>
                </li>
              </ul>
              <div className={classes.AuthSection}>
                {localStorage.getItem("auth-token") === null ? (
                  <form style={{ gap: "10px" }} className="d-flex">
                    <button
                      style={{ marginLeft: "10px" }}
                      className={classes.AuthBtn}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#Login"
                    >
                      Login
                    </button>

                    <p
                      style={{
                        margin: "0",
                        color: "#ced4da",
                        fontSize: "14px",
                      }}
                    >
                      or
                    </p>
                    <button
                      className={classes.AuthBtn}
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Signup
                    </button>
                  </form>
                ) : (
                  <LoginNav />
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
      {/* <PostNav /> */}
    </div>
  );
};

export default NavBar;
