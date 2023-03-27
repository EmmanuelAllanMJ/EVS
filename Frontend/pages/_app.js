import Nav from "../components/Section/Nav/Nav";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <div>
      <SessionProvider session={session}>
        <Nav />
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
