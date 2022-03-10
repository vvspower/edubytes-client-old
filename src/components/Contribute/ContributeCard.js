import React from "react";
import classes from "./contribute.module.css";
import { Link, useNavigate } from "react-router-dom";

const ContributeCard = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/contribute")} className={classes.Card}>
      <h5>Contribute</h5>
      <p>Join this amazing community</p>
      {/* <Link to="/contribute">Contribute</Link> */}
    </div>
  );
};

export default ContributeCard;
