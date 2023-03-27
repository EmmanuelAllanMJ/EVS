import { signOut, useSession } from "next-auth/react";

function User() {
  const { data: session } = useSession();

  {
    session && <p>Connected</p>;
  }
  {
    !session && <p>Not Connected</p>;
  }
}

export default User;
