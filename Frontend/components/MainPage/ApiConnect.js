import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./ApiConnect.module.css";

export default function ApiConnect() {
  const { data: session } = useSession();
  const baseURL = "127.0.0.1:5000/";
  const src = "http://127.0.0.1:5000/video_feed";

  function clickPhoto(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/click_photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, click: "dp" }),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function clickAadhar(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/click_photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, click: "aadhar" }),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function clickPan(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/click_photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, click: "pan" }),
    })
      .then((res) => {
        console.log(res.json());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={classes.app}>
      {/* <h1 className={classes.title}>Hello</h1> */}
      <div className={classes.align}>
        <div className={classes.img}>
          <img src={src} alt="video" />
        </div>
        <Card className={classes.capture}>
          <div className={classes.description}>
            <p>Dp</p>
            <Button onClick={clickPhoto} className={classes.btn}>
              Capture
            </Button>
          </div>
          <div className={classes.description}>
            <p>Aadhar</p>
            <Button onClick={clickAadhar} className={classes.btn}>
              Aadhar
            </Button>
          </div>
          <div className={classes.description}>
            <p>PAN</p>
            <Button onClick={clickPan} className={classes.btn}>
              PAN
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
