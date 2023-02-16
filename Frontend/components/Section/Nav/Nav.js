import React from "react";
import Button from "../../ui/Button";
import classes from "./Nav.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Nav({ link }) {
  const { data: session } = useSession();

  return (
    <nav className={classes.nav}>
      <div>
        <Link href="/">
          <div>EVS</div>
        </Link>
      </div>
      {!session && (
        <div className={classes.btn}>
          <Link href="/signin">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
      {session && (
        <div className={classes.btn}>
          <Link href="/signin">
            <Button onClick={() => signOut()}>Sign Out</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
