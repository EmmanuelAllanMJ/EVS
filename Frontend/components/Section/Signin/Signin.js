import React, { Fragment, useRef } from "react";
import Button from "../../ui/Button";
import classes from "./Signin.module.css";
import Google from "./Google";
import Facebook from "./Facebook";
import Card from "../../ui/Card";
import { signIn } from "next-auth/react";

function SignUp() {
  const inputPhone = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    console.log(inputPhone.current.value);
  };
  return (
    <div className={classes.main}>
      <p className={classes.title}>SIgnUp</p>
      <Card>
        <div
          className={classes.google}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
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

export default SignUp;
