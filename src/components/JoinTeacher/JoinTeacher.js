import React from "react";
import classes from "./JoinTeacher.module.css";
import teachingimg from "../../Images/teaching-vector.jpg";
import Carousel from "react-multi-carousel";
// import TeacherCard from "../TeacherCardvertisement/TeacherCard";
import TeacherCard from "./TeacherCard/TeacherCard";
import Form from "./Form/Form";

const JoinTeacher = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className={classes.Container}>
      {/* <div className="container"> */}
      <div className={classes.Header}>
        <div>
          <h1>
            <span>Teach</span> <br /> for Pakistan
          </h1>
          <button>Join Now</button>
        </div>
        <div>
          <img src={teachingimg} />
        </div>
      </div>
      <p className={classes.spotlight}>SPOTLIGHT</p>
      <div className={classes.Carousel}>
        <Carousel
          itemClass="carousel-item-pTeacherCardding-0-px"
          centerMode={true}
          autoPlaySpeed={50000000}
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          partialVisible={false}
        >
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
          <div>
            <TeacherCard />
          </div>
        </Carousel>
      </div>
      <div className={classes.Apply}>
        <p>APPLY</p>
        <div className="mt-4">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default JoinTeacher;
