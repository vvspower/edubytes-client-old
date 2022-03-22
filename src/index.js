import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavBar from "./components/NavBar/NavBar";
import DataState from "./components/Context.js/DataState";
import UploadNote from "./components/UploadNote/UploadNote";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import CreatePostModal from "./components/CreatePost/CreatePostModal";
import UserPost from "./components/UserPost/UserPost";
import UserProfile from "./components/UserProfile/UserProfile";
import SignupComponent from "./components/Signup/SignupComponent";
import ViewNotes from "./components/ViewNotes/ViewNotes";
import JoinTeacher from "./components/JoinTeacher/JoinTeacher";

ReactDOM.render(
  <React.StrictMode>
    <DataState>
      <Router>
      
        <NavBar />
        <div style={{display: "flex" , flexDirection: "column" , justifyContent: "space-between"}}>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/contribute" element={<UploadNote />} />
          <Route exact path="/discuss" element={<CreatePostModal />} />
          <Route exact path="/discuss/post/:id" element={<UserPost />} />
          <Route exact path="/u/:id" element={<UserProfile />} />
          <Route exact path="/signup" element={<SignupComponent />} />
          <Route exact path="/notes" element={<ViewNotes />} />
          <Route exact path="/join" element={<JoinTeacher/>} />

        </Routes>
        <Footer />
        </div>
      </Router>
    </DataState>
  </React.StrictMode>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
