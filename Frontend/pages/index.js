import { useSession } from "next-auth/react";
import React from "react";
import ApiConnect from "../components/MainPage/ApiConnect";
import MainPage from "../components/MainPage/MainPage";
import Head from "next/head";
function index(props) {
  const { data: session } = useSession();
  // logged in
  if (session) {
    return (
      <>
        <Head>
          <title>EVS - Efficient Verification System</title>
        </Head>
        <ApiConnect BACKEND_API={props.BACKEND_API} />
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>EVS - Efficient Verification System</title>
        </Head>
        <MainPage></MainPage>
      </>
    );
  }
  // return <ApiConnect />;
}
export default index;
export async function getServerSideProps() {
  return {
    props: {
      hello: "Heelow",
      BACKEND_API: process.env.BACKEND_API,
    },
  };
}
