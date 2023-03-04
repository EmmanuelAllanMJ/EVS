import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./ApiConnect.module.css";
import Camera from "./Camera";

export default function ApiConnect() {
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);
    return () => {
      setShow(true);
      clearTimeout(timer);
    };
  }, [response]);

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
        return res.json();
      })
      .then((data) => {
        setResponse(data);
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

  function checkIfImageExists(url) {
    try {
      const img = new Image();
      img.src = url;

      if (img.complete) {
        return true;
      } else {
        img.onload = () => {
          return true;
        };

        img.onerror = () => {
          return false;
        };
      }
    } catch (err) {
      return false;
    }
  }

  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile1, setSelectedFile1] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isSelected1, setIsSelected1] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  const changeHandler1 = (event) => {
    setSelectedFile1(event.target.files[0]);
    setIsSelected1(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();
    // const formData1 = new FormData();

    formData.append("File", selectedFile);
    formData.append("File1", selectedFile1);
    let email = session.user.email.split("@")[0];
    console.log(email);
    fetch(`${process.env.BACKEND_API}/upload/${email}/aadhar`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // streaming video
  // const width = 320; // We will scale the photo width to this
  // const height = 0; // This will be computed based on the input stream

  // const streaming = false;

  // let video = null;
  // let canvas = null;
  // let photo = null;
  // let startbutton = null;

  // video = document.getElementById("video");
  // canvas = document.getElementById("canvas");
  // photo = document.getElementById("photo");
  // startbutton = document.getElementById("startbutton");

  // getting permission to access camera from user
  // navigator.mediaDevices
  //   .getUserMedia({ video: true, audio: false })
  //   .then((stream) => {
  //     video.srcObject = stream;
  //     video.play();
  //     const recorder = new MediaRecorder(stream);
  //     // console.log(recorder);
  //     recorder.ondataavailable = (event) => {
  //       // takepicture();
  //       console.log("capture recorder");
  //     };
  //     recorder.start(10000);
  //   })
  //   .catch((err) => {
  //     console.error(`An error occurred: ${err}`);
  //   });
  // taking photo
  // function takepicture() {
  //   const context = canvas.getContext("2d");
  //   if (width && height) {
  //     canvas.width = width;
  //     canvas.height = height;
  //     context.drawImage(video, 0, 0, width, height);

  //     const data = canvas.toDataURL("image/png");
  //     // photo.setAttribute("src", data);
  //     console.log(data);
  //     console.log("take picture");
  //   }
  // }

  return (
    <div className={classes.app}>
      {/* <h1 className={classes.title}>Hello</h1> */}
      <div className={classes.align}>
        <Camera />
        <Card className={classes.capture}>
          <div className={classes.description}>
            <p>Dp</p>
            <Button onClick={clickPhoto}>Capture</Button>
          </div>

          {show && <p className={classes.response}>{response}</p>}
          <div className={classes.divider}></div>
          <div className={classes.form}>
            <input
              className={classes.upload}
              type="file"
              name="file1"
              onChange={changeHandler}
            />
            {isSelected ? (
              <div>
                <p> </p>
              </div>
            ) : (
              <p>Upload You Aadhar</p>
            )}
            <input
              className={classes.upload}
              type="file"
              name="file1"
              onChange={changeHandler1}
            />
            {isSelected1 ? (
              <div>
                <p></p>
              </div>
            ) : (
              <p>Upload You Pan</p>
            )}
            <div>
              <Button onClick={handleSubmission}>Submit</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
