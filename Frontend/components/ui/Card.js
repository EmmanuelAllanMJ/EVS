import React from "react";
import classes from "./Card.module.css";

function Card({ children, className }) {
  return <div className={`${classes.position} ${className}`}>{children}</div>;
}

export default Card;
