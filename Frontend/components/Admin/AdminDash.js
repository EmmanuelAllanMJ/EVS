import { signOut, useSession } from "next-auth/react";
import Button from "../ui/Button";
import classes from "./AdminDash";

function AdminDash() {
  const { data: session } = useSession();
  async function adminHandler(email) {
    const response = await fetch("/api/admin", {
      method: "POST",
      body: JSON.stringify(email),
      header: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data);
    // router.push("/");
  }
  if (session) {
  }
  // console.log(session.user.email);

  console.log(session);
  return (
    <div className={classes.marginTop}>
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
        <Button onClick={() => adminHandler(session.user.email)}>
          Click me
        </Button>
      )}
      {session && <Button>Connected</Button>}{" "}
      {!session && <Button>Disconnected</Button>}
    </div>
  );
  // return <div>Hello</div>;
}

export default AdminDash;
