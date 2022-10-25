import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import Nav from "../components/nav";
import Title from "../components/title";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <ToastContainer />
      <Nav />
      <Title />
      <AnimatePresence initial={false}>
        <Component key={router.pathname} {...pageProps} />
      </AnimatePresence>
    </>
  );
}

export default MyApp;
