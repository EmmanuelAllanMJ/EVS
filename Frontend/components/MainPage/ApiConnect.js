import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./ApiConnect.module.css";

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
    fetch(`http://localhost:5000/upload/${email}/aadhar`, {
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
  const width = 320; // We will scale the photo width to this
  const height = 0; // This will be computed based on the input stream

  const streaming = false;

  let video = null;
  let canvas = null;
  let photo = null;
  let startbutton = null;

  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  photo = document.getElementById("photo");
  startbutton = document.getElementById("startbutton");

  // getting permission to access camera from user
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((stream) => {
      const recorder = new MediaRecorder(stream);
      // console.log(recorder);
      recorder.ondataavailable = (event) => {
        // get the Blob from the event
        const blob = event.data;
        // and send that blob to the server...
        const videoUrl = URL.createObjectURL(blob);
        // console.log("VIdeourl", videoUrl);
        // const file = new File([blob], "image.jpg", { type: blob.type });
        // console.log(file);
        var data = new FormData();
        data.append("Video", blob);
        fetch("http://127.0.0.1:5000/receive", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
          });
        // let formData = new FormData();

        // formData.append("Video", videoUrl);
        // fetch(`http://localhost:5000/receive`, {
        //   method: "POST",
        //   body: formData,
        // })
        //   .then((response) => response.json())
        //   .then((result) => {
        //     console.log("Success:", result);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
      };

      // make data available event fire every one second

      recorder.start(5000);
      video.srcObject = stream;
      video.play();
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });

  return (
    <div className={classes.app}>
      {/* <h1 className={classes.title}>Hello</h1> */}
      <div className={classes.align}>
        {/* <div className={classes.img}>
          {checkIfImageExists(src) ? (
            <img src={src} alt="video" />
          ) : (
            <p>Loading...</p>
          )}
        </div> */}
        <div className="camera">
          <video id="video">Video stream not available.</video>
          <button id="startbutton">Take photo</button>
        </div>

        <canvas id="canvas"> </canvas>
        <div class="output">
          <img id="photo" alt="The screen capture will appear in this box." />
        </div>
        <Card className={classes.capture}>
          <div className={classes.description}>
            <p>Dp</p>
            <Button onClick={clickPhoto}>Capture</Button>
          </div>

          {show && <p className={classes.response}>{response}</p>}
          <div className={classes.divider}></div>
          <div className={classes.form}>
            {/* <input className={classes.upload} type="file" name="file" />
            {isSelected ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
                <p>
                  lastModifiedDate:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
                </p>
              </div>
            ) : (
              <p>Upload You Aadhar</p>
            )} */}
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
