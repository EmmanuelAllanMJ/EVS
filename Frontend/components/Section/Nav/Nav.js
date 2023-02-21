import React from "react";
import Button from "../../ui/Button";
import classes from "./Nav.module.css";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

function Nav() {
  const { data: session } = useSession();

  return (
    <nav className={classes.nav}>
      <div>
        <Link href="/" passHref>
          <a>
            <div className={classes.logo}>EVS</div>
          </a>
        </Link>
      </div>
      {!session && (
        <div className={classes.btn}>
          <Link href="/signin" passHref>
            <a>
              <Button>Sign Up</Button>
            </a>
          </Link>
        </div>
      )}
      {session && (
        <div className={classes.btn}>
          <p>{session.user.email}</p>
          <Link href="/signin" passHref>
            <a>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Nav;
