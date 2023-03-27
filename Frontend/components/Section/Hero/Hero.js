import React, { Fragment } from "react";
import Button from "../../ui/Button";
import Nav from "../Nav/Nav";
import classes from "./Hero.module.css";
import { signIn } from "next-auth/react";

function Hero() {
  const adminHandler = () => {};
  const userHandler = () => {};
  return (
    <div className={classes.hero}>
      {/* <div className={classes.content}>
        <h2 className={classes.title}>Your instant automated e-KYC client</h2>
        <div>
          <h3 className={classes.title_instruction}>Instructions</h3>
          <p className={classes.instruction}>
            1. Sign In using your google account
          </p>
          <p className={classes.instruction}>
            2. Capture DP &#8594; Liveness &#8594; Upload files
          </p>
          <p className={classes.instruction}>
            3. Input your wallet address and generate a token
          </p>
          <p className={classes.instruction}>4. Submit !</p>
        </div>
      </div>
      <div className={classes.img}>
        <img src={"./images/aadharSample.png"} alt="aadhar Sample" />
      </div> */}
      <Button onClick={() => signIn("google", { callbackUrl: "/admin" })}>
        Admin Login
      </Button>
      <Button onClick={() => signIn("google", { callbackUrl: "/user" })}>
        User Login
      </Button>
    </div>
  );
}

export default Hero;
