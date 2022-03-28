import React, { useState } from "react";
import DataContext from "./dataContext";
import { useNavigate } from "react-router-dom";

const DataState = (props) => {
  const [example, setexample] = useState("1");
  const [blogs, setBlogs] = useState([]);
  const [blogById, setBlogById] = useState({});
  const [user, setUser] = useState([]);
  const [hoversuccess, sethoversuccess] = useState(false);
  const [clickuser, setclickuser] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  const [postedBlog, setPostedBlog] = useState(false);
  const [autherrors, setautherrors] = useState(null);
  const [replies, setreplies] = useState([]);
  const [replysuccess, setReplySuccess] = useState(false);
  const [isliked, setisliked] = useState(false);
  const [uploadNoteSuccess, setUploadNoteSucess] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [loadedPosts, setLoadedPosts] = useState(0);
  const [Ads, setAds] = useState([]);
  const [userAds, setUserAds] = useState([]);
  const [currentAdId, setCurrentAdId] = useState("");
  const [moreBlogs, setMoreBlogs] = useState(true);

  const address = "http://localhost:5000";

  // Signup API
  const Signup = async (name, email, password) => {
    let success = false;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("auth-token", json.authToken);
      success = true;
    }

    return success;
  };

  // API to get the userID from the auth-token created when a new user is signed in
  const getUserAndRedirect = async (token) => {
    let success = false;
    const response = await fetch(`${address}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
    success = true;
    let reply = { success, json };
    return reply;
  };

  // Fetch all blogs on the website
  const fetchBlog = async (id) => {
    const response = await fetch(`${address}/api/app/fetchallblogposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    setLoadedPosts(json.length);
    setBlogs(json);
  };

  const LoadMoreBlogs = async (id) => {
    const response = await fetch(
      `${address}/api/app/loadmoreblogposts/${loadedPosts}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setLoadedPosts(json.blogposts.length);
    setMoreBlogs(json.morePosts);

    setBlogs(json.blogposts);
  };

  const Contribute = async (title, link, type, subject) => {
    console.log(title, link, type, subject);
    const response = await fetch(`${address}/api/app/resource`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        name: title,
        type: type,
        subject: subject,
        link: link,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setUploadNoteSucess(true);
    }
    console.log(json);
  };

  // Fetch a Specific blog using its ID
  const fetchBlogById = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/fetchblog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    success = true;
    // stores the post data for it to be used in UserPost Component
    setBlogById(json);
    return success;
  };

  const fetchUserSpecificBlog = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/fetchuserblogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userblog = await response.json();
    console.log(userblog);
    success = true;
    return { success, userblog };
    // console.log(blogById);
  };

  // fetches user info API when cursor hovered over a profile picture
  const fetchUserInfo = async (id) => {
    sethoversuccess(false);
    const response = await fetch(`${address}/api/auth/getusernoauth/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json.name);
    sethoversuccess(true);
    setUser(json);
    return json;
  };

  const fetchUserInfoBasic = async (id) => {
    const response = await fetch(`${address}/api/auth/getusernoauth/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(
      "🚀 ~ file: DataState.js ~ line 173 ~ fetchUserInfoBasic ~  json",
      json
    );
    console.log(json);
    return json.pfp;
  };

  // Login User API

  const LoginUser = async (email, password) => {
    const response = await fetch(`${address}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const token = await response.json();
    console.log(token.authToken);
    const getid = await fetch(`${address}/api/auth/getUserId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token.authToken,
      },
    });
    const id = await getid.json();
    console.log(id);
    // getUserId
    setautherrors(token);
    console.log(token);
    if (token?.success) {
      // if(token.error)
      localStorage.setItem("auth-token", token.authToken);
      localStorage.setItem("user", id);
      window.location.reload();
    }
  };

  // Post Question API takes title , description and tag as parameter

  const PostQuestion = async (title, desc, tags, image) => {
    setPostedBlog(false);
    const response = await fetch(`${address}/api/app/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        title: title,
        description: desc,
        tag: tags,
        image: image,
      }),
    });
    const json = await response.json();
    console.log(json.savedblogpost._id);

    if (json.success) {
      window.location.href = `/discuss/post/p?id=${json.savedblogpost._id}&user=${json.savedblogpost.user}`;
    }
    // `/discuss/post/p?id=${props.id}&user=${props.user}`
    console.log(json);
  };

  const EditQuestion = async (title, desc, tags, image, id) => {
    setPostedBlog(false);
    const response = await fetch(`${address}/api/app/updateblog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        title: title,
        description: desc,
        tag: tags,
        image: image,
      }),
    });
    const json = await response.json();

    if (json.success) {
      window.location.reload();
    }
    // `/discuss/post/p?id=${props.id}&user=${props.user}`
    console.log(json);
  };

  // Reply API

  const PostReply = async (postid, reply) => {
    const response = await fetch(`${address}/api/app/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        postid: postid,
        reply: reply,
      }),
    });
    const json = await response.json();
    const data = [...replies];
    data.push(json.savedreplies);
    console.log(data);

    setreplies(data);
    console.log(json);
  };

  // Fetch Reply API called at the starting of the UserPost component being mounted

  const fetchReplies = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/fetchreplies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    success = true;
    setReplySuccess(success);
    setreplies(json);
    console.log(json);
    return json;
  };

  // /deleteBlog/:id

  const DeleteBlog = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/deleteBlog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    success = true;
    return success;
  };

  const DeleteAd = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/deleteAd/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    success = true;
    return success;
  };

  const fetchUserWithAuth = async (token) => {
    const response = await fetch(`${address}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
    console.log(json);
    setLoggedUser(json);
  };

  // LIKING POST API

  const checkifliked = async (id) => {
    const response = await fetch(`${address}/api/app/fetchliked/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    setisliked(json.liked);
  };

  const fetchResources = async (id) => {
    const response = await fetch(`${address}/api/app/fetchallresources`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const fetchUserResources = async (id) => {
    const response = await fetch(
      `${address}/api/app/fetchuserresources/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    return json;
  };

  const fetchAllUsers = async () => {
    const response = await fetch(`${address}/api/auth/fetchallusers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };

  const fetchAllAds = async () => {
    const response = await fetch(`${address}/api/app/fetchallads`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(
      "🚀 ~ file: DataState.js ~ line 353 ~ fetchAllAds ~ json",
      json
    );
    setAds(json);
  };

  const fetchUserAds = async (id) => {
    const response = await fetch(`${address}/api/app/fetchuserads/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(
      "🚀 ~ file: DataState.js ~ line 353 ~ fetchAllAds ~ json",
      json
    );
    if(json === {}) {
      setUserAds([])
    } else {
      setUserAds(json)
    }
    
  };

  const JoinTeacher = async (
    name,
    subject,
    institution,
    contact,
    price,
    image
  ) => {
    const response = await fetch(`${address}/api/app/postAd`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({
        name,
        subject,
        institution,
        contact,
        price,
        image,
      }),
    });
    const json = await response.json();
    console.log(json);
    return json.success;
  };

  return (
    <DataContext.Provider
      value={{
        example,
        fetchBlog,
        blogs,
        blogById,
        fetchBlogById,
        setBlogById,
        fetchUserInfo,
        user,
        hoversuccess,
        LoginUser,
        clickuser,
        setclickuser,
        loggedUser,
        fetchUserWithAuth,
        PostQuestion,
        autherrors,
        setautherrors,
        fetchUserSpecificBlog,
        PostReply,
        replies,
        setreplies,
        fetchReplies,
        replysuccess,
        checkifliked,
        isliked,
        setisliked,
        Signup,
        Contribute,
        getUserAndRedirect,
        uploadNoteSuccess,
        setUploadNoteSucess,
        Notes,
        fetchResources,
        fetchUserResources,
        fetchAllUsers,
        LoadMoreBlogs,
        DeleteBlog,
        JoinTeacher,
        fetchAllAds,
        Ads,
        EditQuestion,
        fetchUserInfoBasic,
        moreBlogs,
        fetchUserAds,
        userAds,
        currentAdId,
        setCurrentAdId,
        DeleteAd,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
