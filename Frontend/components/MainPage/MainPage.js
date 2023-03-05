import React, { Fragment } from "react";
import Hero from "../Section/Hero/Hero";
import Nav from "../Section/Nav/Nav";
import classes from "./MainPage.module.css";

function MainPage() {
  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.one}>
          <Hero />
        </section>
      </div>
    </Fragment>
  );
}

export default MainPage;
