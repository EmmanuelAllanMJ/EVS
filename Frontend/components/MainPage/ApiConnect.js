import { useSession } from "next-auth/react";
import React, { useEffect, useState, useRef } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import classes from "./ApiConnect.module.css";
import Camera from "./Camera";

export default function ApiConnect({ BACKEND_API }) {
  const [response, setResponse] = useState("");
  const [show, setShow] = useState(false);
  const [isResponse, setIsResponse] = useState("Response");
  let count = 0;

  const { data: session } = useSession();

  let email = session.user.email.split("@")[0];

  function clickPhoto(e) {
    e.preventDefault();
    fetch(`${BACKEND_API}/click_photo/${email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, click: "dp" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIsResponse(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function checkLiveliness(e) {
    setIsResponse("Show happy, neutral, surprise emotions");
    e.preventDefault();
    fetch(`${BACKEND_API}/check_liveliness/${email}`, {
      method: "POST",
      body: "hello",
    })
      .then((res) => {
        setIsResponse("Verified successfully");
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setResponse(data);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log(email);
    fetch(`${BACKEND_API}/upload/${email}/aadhar`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Finished request");
  };

  // getting response
  // fetch(`${BACKEND_API}/response`)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((result) => {
  //     setIsResponse(result["message"]);
  //     console.log("Success:", result);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });

  return (
    <div className={classes.app}>
      {/* <h1 className={classes.title}>Hello</h1> */}
      <div className={classes.align}>
        <Camera BACKEND_API={BACKEND_API} email={email} />
        <Card className={classes.capture}>
          <div className={classes.description}>
            <p>{isResponse}</p>
            <Button onClick={clickPhoto}>Capture DP</Button>
          </div>
          <div className={classes.description}>
            <Button onClick={checkLiveliness}>Check Liveliness</Button>
          </div>
          {show && <p className={classes.response}>{response}</p>}

          <div className={classes.divider}>
            <span className={classes.dividerLine}></span>
            <span className={classes.dividerText}>File upload</span>
            <span className={classes.dividerLine}></span>
          </div>
          <div className={classes.form}>
            <div className={classes.description}>
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
                onChange={changeHandler}
              />
            </div>
            <div className={classes.description}>
              {isSelected1 ? (
                <div>
                  <p></p>
                </div>
              ) : (
                <p>Upload You Pan</p>
              )}
              <input
                className={classes.upload}
                type="file"
                name="file1"
                onChange={changeHandler1}
              />
            </div>
          </div>
          <Button onClick={handleSubmission}>Submit</Button>
        </Card>
      </div>
    </div>
  );
}
