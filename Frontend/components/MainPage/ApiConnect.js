import axios, { axiosClient } from "axios";
import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./ApiConnect.module.css";

export default function ApiConnect() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResponse, setIsResponse] = useState("");

  const baseURL = "127.0.0.1:5000/";
  const src = "http://127.0.0.1:5000/video_feed";

  function createPost() {
    axios
      .post(`${baseURL}/requests`, {
        title: "Hello World!",
        body: "This is a new post.",
        click: "Capture",
      })
      .then((response) => {
        setIsResponse(response.data);
        console.log(response.data);
      });
    axios.get(`${baseURL}/requests`, {});
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
            <Button onClick={createPost} className={classes.btn}>
              Capture
            </Button>
          </div>
          <div className={classes.description}>
            <p>Aadhar</p>
            <Button onClick={createPost} className={classes.btn}>
              Aadhar
            </Button>
          </div>
          <div className={classes.description}>
            <p>PAN</p>
            <Button onClick={createPost} className={classes.btn}>
              PAN
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
