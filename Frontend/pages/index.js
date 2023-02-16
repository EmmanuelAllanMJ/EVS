import { useSession } from "next-auth/react";
import React from "react";
import ApiConnect from "../components/MainPage/ApiConnect";
import MainPage from "../components/MainPage/MainPage";

function index() {
  const { data: session } = useSession();

  // logged in
  if (session) {
    return (
      <>
        <ApiConnect />
      </>
    );
  } else {
    return <MainPage />;
  }
}

export default index;
