import React, { useContext } from "react";
import user from "../../../Images/user.png";
import classes from "./sidebar.module.css";
import dataContext from "../../Context.js/dataContext";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const context = useContext(dataContext);
  const loggedUser = context.loggedUser;

  const logout = () => {
    localStorage.removeItem("auth-token");
    window.location.reload();
  };
  return (
    <div className={classes.SideBar}>
      <div className="container-fluid container">
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
          style={{ maxWidth: "220px" }}
        >
          <button data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample" style={{border: 0 , borderBottom: "2px solid #f1f3f5" ,backgroundColor: "#fff" , display: "flex" ,  justifyContent: "flex-start"}}>
            <div
              onClick={() => navigate(`/u/user?id=${loggedUser.userId}`)}
              className={classes.User}
            >
              {localStorage.getItem("auth-token") ? (
                <div>
                  <img
                    style={{marginRight: "50px" , marginBottom: "5px"}}
                    src={loggedUser?.user?.pfp}
                    height={50}
                    width={50}
                  />
                  <h6 class="offcanvas-title" id="offcanvasExampleLabel">
                    {loggedUser.user?.name}
                  </h6>
                </div>
              ) : (
                <div className={classes.AuthButtons}>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#Login"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    Login
                  </button>
                  <span>or</span>
                  <button>Signup</button>
                </div>
              )}
            </div>
          </button>

          <div className={classes.Buttons}>
            <div>
              <button
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => {
                  navigate("/discuss");
                }}
              >
                Discuss
              </button>{" "}
              <button  data-bs-dismiss="offcanvas"
                aria-label="Close" onClick={() => {
                  navigate("/contribute");
                }}>Contribute</button>
              <button  data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={() => {
                  navigate("/notes");
                }}>Notes</button>
              <button>Teach</button>


            </div>
            <div>
              <button>Contact </button>
            </div>
            {localStorage.getItem("auth-token") ? (
              <aside style={{}} className={classes.UserModal}>
                <div>
                  <aside className={classes.LogoButtons}>
                    <button>
                      <svg
                        style={{ opacity: "0.6" }}
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        height={20}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <p>Your notes</p>
                    </button>
                  </aside>
                  <aside className={classes.LogoButtons}>
                    <button>
                      <svg
                        style={{ opacity: "0.6" }}
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        height={20}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p>Your questions</p>
                    </button>
                  </aside>
                  <aside className={classes.LogoButtons}>
                    <button>
                      <svg
                        style={{ opacity: "0.6" }}
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        height={20}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                      <p>Likes</p>
                    </button>
                  </aside>
                  <aside className={classes.LogoButtons}>
                    <button
                      onClick={() => {
                        logout();
                      }}
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
                      <svg
                        style={{ opacity: "0.6" }}
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        height={20}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <p>Logout</p>
                    </button>
                  </aside>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
