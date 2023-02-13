import React, { Fragment } from "react";
import Nav from "../Nav/Nav";
import classes from "./Hero.module.css";

function Hero() {
  return (
    <div className={classes.hero}>
      <div className={classes.content}>
        <h2 className={classes.title}>Your instant automated e-KYC client</h2>
        <p className={classes.description}>Powered by open-source</p>
      </div>
      <div className={classes.img}>
        <img src={"./images/aadharSample.png"} alt="aadhar Sample" />
      </div>
    </div>
  );
}

export default Hero;
