import React from "react";
import UniversityCarousel from "./UniversityCarousel";
import classes from "./university.module.css";
import AdCarousel from "../Advertisement/AdCarousel";
import userimg from '../../Images/fubuki.jpg'
import sparkle from '../../Images/sparkling.png'

const UniversityCard = () => {
  return (
    <div className={classes.UniversityCard}>
      <div>
      <UniversityCarousel/>
      </div>
      <div onClick={()=> alert("Coming soon!")} className={classes.Text} >
        <div style={{display: "flex" , alignItems: "center" , gap: "5px"}}>
        <img className={classes.sparkle} src={sparkle}/>
        <h5>Join the University Connections</h5>
        </div>
        <p className={classes.MainText}>Do you want to choose the perfect university for your further studies? 
          Or do you want to become a part of the Largest Univeristy Community in Pakistan?
          </p>
          <p className={classes.AltText}>Find the perfect Pathway for you. Join the largest University Connection of Pakistan.
          </p>
          <div className={classes.JoinedUsers} >
          <img src={userimg} height={20}/>
          <img src={userimg} height={20}/>
          <img src={userimg} height={20}/>
          <img src={userimg} height={20}/>
          <span>Join 100's of others</span>
          </div>
  
      </div>
    </div>
  );
};

export default UniversityCard;
