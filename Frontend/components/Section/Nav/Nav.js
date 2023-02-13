import React from "react";
import Button from "../../ui/Button";
import classes from "./Nav.module.css";
import Link from "next/link";

function Nav({ link }) {
  return (
    <nav className={classes.nav}>
      <div>
        <Link href="/">
          <div>EVS</div>
        </Link>
      </div>
      {link && (
        <div className={classes.btn}>
          <Link href="/signin">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
