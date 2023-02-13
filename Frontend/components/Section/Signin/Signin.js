import React, { Fragment, useRef } from "react";
import Button from "../../ui/Button";
import classes from "./Signin.module.css";
import Google from "./Google";
import Facebook from "./Facebook";
import Card from "../../ui/Card";

import { getAuth, RecaptchaVerifier } from "firebase/auth";

function SIgnUp() {
  const inputPhone = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    console.log(inputPhone.current.value);
  };
  return (
    <div className={classes.main}>
      <p className={classes.title}>SignUp</p>
      <Card>
        <div className={classes.google}>
          <div className={classes.icon}>
            <Google />
          </div>
          <p>SignUp with Google</p>
        </div>

        <div className={classes.facebook}>
          <div className={classes.icon}>
            <Facebook />
          </div>
          <p>SignUp with Facebook</p>
        </div>
        <p className={classes.or}>or</p>

        <input
          ref={inputPhone}
          className={classes.input}
          placeholder="+91  Enter your phone number"
          required
          pattern="/^[0-9]{10}$/;"
          type="number"
        />
        <Button onClick={onButtonClick}>Get OTP</Button>
      </Card>
    </div>
  );
}
const getStaticProps = () => {
  const auth = getAuth();
  auth.languageCode = "it";
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();

  return { props: {} };
};

export default SIgnUp;
