import React, { useContext, useEffect, useState } from "react";
import Ad from "./Advertisement/Ad";
import Beta from "./Beta";
import Contactus from "./Contribute/Contactus";
import ContributeCard from "./Contribute/ContributeCard";
import TeachCard from "./Contribute/TeachCard";
import LatestNotes from "./LatestNotes/LatestNotes";
import classes from "./main.module.css";
import paper from "../Images/paper.png";
import Comment from "./CommentComponent/Comment";
import dataContext from "./Context.js/dataContext";
import LoadingBar from "react-top-loading-bar";
import increase from "../Images/increase.png";
import PopularPost from "./PopularPost/PopularPost";
import AdCarousel from "./Advertisement/AdCarousel";
import CreatePost from "./CreatePost/CreatePost";
import PopularNotes from "./Contribute/PopularNotes";
import LoginModal from "./Auth/LoginModal";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import UniversityCard from "./UniversityCard/UniversityCard";
import TopUsers from "./TopUsers/TopUsers";
import loader from "../Images/default-loading.gif";
// import 'style!css!react-responsive-carousel/lib/styles/carousel.css';
// import css from "file.css";

const Main = () => {
  const context = useContext(dataContext);
  const moreBlogs = context.moreBlogs
  const LoadMoreBlogs = context.LoadMoreBlogs;
  const fetchAllAds = context.fetchAllAds;
  const clickuser = context.clickuser;
  const setclickuser = context.setclickuser;
  const blogs = context.blogs;
  const fetchBlog = context.fetchBlog;
  const SortByLikes = context.SortByLikes;
  const Ads = context.Ads;

  const [progress, setProgress] = useState(30);
  console.log(blogs);
  console.log(Ads);

  useEffect(() => {
    console.log(context.example);
    // fetches the global blogs from the backend at the start of the load
    fetchAllAds();
    fetchBlog();
    setProgress(100);
  }, []);
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

  return (
    <div
      onClick={() => {
        setclickuser(false);
        // clicking anywhere on the div will close the user setting modal
      }}
    >
      <LoadingBar
        height={2}
        color="#ffd43b"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className={classes.Container}>
        <div className={classes.NoteContainer}>
          <div className={classes.UniCard}>
            <UniversityCard />
          </div>
          <div className={classes.Post}>
            <div className={classes.Popular}>
              {/* returns the top 2 most voted posts made on the website */}
              {blogs.slice(0, 2).map((item, i) => {
                return (
                  <PopularPost
                    title={item.title}
                    description={item.description}
                    tags={item.tags}
                    likes={item.likes}
                    id={item._id}
                    user={item.user}
                  />
                );
              })}
            </div>
          </div>
          <div className={classes.Inner}>
            <div className={classes.Increase}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "10px",
                }}
              >
                <img height="24px" src={increase} />
                <h6>Popular</h6>
              </div>
              <a
                href="/"
                style={{
                  marginRight: "20px",
                  fontSize: "12px",
                  textDecoration: "none",
                  color: "#ced4da",
                }}
              >
                View All
              </a>
            </div>
            <div className={classes.Ad}>
              {/* teacher ad carousel */}
              <Carousel
                itemClass="carousel-item-padding-0-px"
                centerMode={true}
                autoPlaySpeed={50000000}
                responsive={responsive}
                removeArrowOnDeviceType={["tablet", "mobile"]}
                partialVisible={false}
              >
                {Ads?.map((item, i) => {
                  return (
                    <div>
                      <Ad
                        name={item.name}
                        institution={item.institution}
                        image={item.image}
                        subject={item.subject}
                        fees={item.price}
                        contact={item.contact}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div>
              {blogs.length < 1 ? (
                <img className={classes.Loading} height={50} src={loader} />
              ) : (
                blogs.map((item, i) => {
                  console.log(item.image);
                  return (
                    <LatestNotes
                      title={item.title}
                      description={item.description}
                      id={item._id}
                      username={item.username}
                      user={item.user}
                      image={item.image}
                      tag={item.tag}
                      pfp={item.pfp}
                      date={item.date}
                    />
                  );
                })
              )}
            </div>
          </div>
          {blogs.length > 0 ? (
            moreBlogs ? <div className={classes.LoadMore}>
              <button
                onClick={() => {
                  LoadMoreBlogs();
                }}
              >
                Load More
              </button>
            </div> : <h6 style={{width: "200px"}} className={classes.LoadMore}>No More Blogs To Load</h6>
          ) : null}
        </div>
        <div className={classes.Cards}>
          <PopularNotes />
          <CreatePost />
          <TeachCard />
          <AdCarousel />
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default Main;
