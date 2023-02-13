import React, { Fragment } from "react";
import Button from "../../ui/Button";

function Login() {
  return (
    <Fragment>
      <p>Login</p>
      <div>
        <p>Login with Google</p>
      </div>
      <div>
        <p>Login with Facebook</p>
      </div>
      <p>or</p>
      <input placeholder="+91  Enter your phone number" />
      <Button>Get OTP</Button>
    </Fragment>
  );
}

export default Login;
