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
  const [signuperror, setSignupError] = useState("");

  const address = process.env.REACT_APP_HEROKU_API

  // Signup API
  const Signup = async (name, email, password) => {
    let success = false;
    const response = await fetch(`${address}/api/auth/createuser`, {
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
    
    if (json?.errors?.length !== 0) {
      // this is checking if the error came as a string inside an array or directly as a string
      // error message is set accordingly
      if (typeof json.errors === "object") {
        setSignupError(json.errors[0].msg);
      }
      if (typeof json.errors === "string") {
        setSignupError(json.errors);
      }
    }
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
    const response = await fetch(`${address}/api/app/blog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    
    setLoadedPosts(json.length);
    // this set the amount of already loaded posts so when more are loaded a reference is sent of how many already are loaded
    setBlogs(json);
  };

  // Load more blogs on the website
  const LoadMoreBlogs = async (id) => {
    const response = await fetch(
      // reference of amount of posts loaded sent from loadedposts
      `${address}/api/app/loadblog/${loadedPosts}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    // this sets the amount of loadedposts.
    setLoadedPosts(json.blogposts.length);
    setMoreBlogs(json.morePosts);
    setBlogs(json.blogposts);
  };

  const Contribute = async (title, link, type, subject) => {
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
    success = true;
    // stores the post data for it to be used in UserPost Component
    setBlogById(json);
    return success;
  };

  const fetchUserSpecificBlog = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/blog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const userblog = await response.json();
    success = true;
    return { success, userblog };

  };

  // fetches user info API when cursor hovered over a profile picture
  const fetchUserInfo = async (id) => {
    sethoversuccess(false);
    const response = await fetch(`${address}/api/auth/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // hover success refers to whether the data for the user has been loaded or not
    sethoversuccess(true);
    setUser(json);
    return json;
  };

  const fetchUserInfoBasic = async (id) => {
    const response = await fetch(`${address}/api/auth/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
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

    //  gets the _id of the user which has logged in.
    const getid = await fetch(`${address}/api/auth/getUserId`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token.authToken,
      },
    });
    const id = await getid.json();
    
    // sets any errors ( such as wrong email or password )
    setautherrors(token);
    if (token?.success) {
      localStorage.setItem("auth-token", token.authToken);
      localStorage.setItem("user", id);
      window.location.reload();
    }
  };

  // Post Question API takes title , description and tag as parameter

  const PostQuestion = async (title, desc, tags, image) => {
    setPostedBlog(false);
    const response = await fetch(`${address}/api/app/blog`, {
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
    
    if (json.success) {
      // redirect to the post if success
      window.location.href = `/discuss/post/p?id=${json.savedblogpost._id}&user=${json.savedblogpost.user}`;
    }
    // `/discuss/post/p?id=${props.id}&user=${props.user}`
  };

  const EditQuestion = async (title, desc, tags, image, id) => {
    setPostedBlog(false);
    const response = await fetch(`${address}/api/app/blog/${id}`, {
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
    setreplies(data);
  };

  // Fetch Reply API called at the starting of the UserPost component being mounted

  const fetchReplies = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/replies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    success = true;
    setReplySuccess(success);
    setreplies(json);
    return json;
  };

  // API to Delete Blog

  const DeleteBlog = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/blog/${id}`, {
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

  // API to Delete Ad

  const DeleteAd = async (id) => {
    let success = false;
    const response = await fetch(`${address}/api/app/ads/${id}`, {
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

  // API to fetch user using their auth-token


  const fetchUserWithAuth = async (token) => {
    const response = await fetch(`${address}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
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

  // fetching  all Resources API

  const fetchResources = async (id) => {
    const response = await fetch(`${address}/api/app/resource`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // fetching  user specific  Resources API

  const fetchUserResources = async (id) => {
    const response = await fetch(
      `${address}/api/app/resource/${id}`,
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

  // fetching all users ( in backend the limit is 10 )

  const fetchAllUsers = async () => {
    const response = await fetch(`${address}/api/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  };

  
  
  const fetchAllAds = async () => {
    const response = await fetch(`${address}/api/app/allads`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    
    
    setAds(json);
  };
  // fetching user specific Ads API


  const fetchUserAds = async (id) => {
    const response = await fetch(`${address}/api/app/ads/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    
    
    if (json === {}) {
      setUserAds([]);
    } else {
      setUserAds(json);
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
    const response = await fetch(`${address}/api/app/ads`, {
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
        signuperror,
        setSignupError,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataState;
