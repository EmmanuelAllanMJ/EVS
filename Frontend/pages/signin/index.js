import React, { useRef } from "react";
import SIgnUp from "../../components/Section/Signin/Signin";
import Card from "../../components/ui/Card";
import Google from "../../components/Section/Signin/Google";
import Facebook from "../../components/Section/Signin/Facebook";
import Button from "../../components/ui/Button";
import classes from "../../components/Section/Signin/Signin.module.css";

function SignIn() {
  const inputPhone = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    console.log(inputPhone.current.value);
  };
  return (
    <div className={classes.main}>
      <p className={classes.title}>SIgnUp</p>
      <Card>
        <div className={classes.google}>
          <div className={classes.icon}>
            <Google />
          </div>
          <p>SIgnUp with Google</p>
        </div>

        <div className={classes.facebook}>
          <div className={classes.icon}>
            <Facebook />
          </div>
          <p>SIgnUp with Facebook</p>
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

function getStaticProps() {
  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {},
    auth
  );

  const phoneNumber = getPhoneNumberFromUserInput();
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      // ...
    })
    .catch((error) => {
      // Error; SMS not sent
      // ...
    });
}

export default SignIn;
