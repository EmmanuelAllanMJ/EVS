import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "../ui/Button";
// import classes from "./UserDash.modules.css";

function UserDash() {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState("");
  async function userHandler(email) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(email),
      header: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    setIsAdmin(data);
    // router.push("/");
  }
  if (session) {
  }
  // console.log(session.user.email);

  console.log(session);
  return (
    <div>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      <p>Lorem ipsum dolor sit amet.</p>
      {session && (
        <Button onClick={() => userHandler(session.user.email)}>
          Click me
        </Button>
      )}
      {session && isAdmin && <Button>You are a user</Button>}
      {session && <Button>Connected</Button>}
      {!session && <Button>Disconnected</Button>}
    </div>
  );
  // return <div>Hello</div>;
}

export default UserDash;
