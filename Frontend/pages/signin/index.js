import Card from "../../components/ui/Card";
import Google from "../../components/Section/Signin/Google";
import Facebook from "../../components/Section/Signin/Facebook";
import Button from "../../components/ui/Button";
import classes from "../../components/Section/Signin/Signin.module.css";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import Signin from "../../components/Section/Signin/Signin";

function SignIn() {
  const inputPhone = useRef();
  const onButtonClick = (e) => {
    e.preventDefault();
    console.log(inputPhone.current.value);
  };
  return <Signin />;
}

export default SignIn;
