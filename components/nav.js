import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";

export default function Nav() {
  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <nav className="bg-gradient-to-r from-white  to-accentColor absolute z-10 top-0 left-0 text-bgColor  flex gap-3 md:gap-5 w-full px-[10px] justify-end items-center h-[50px]  mb-0 mx-auto text-md md:text-lg font-normal">
        <Link href="/onlineservices" passHref>
          <a>
            <div
              id="osBtn"
              onMouseDown={() => {
                document.getElementById("osBtn").style.transform =
                  "scale(0.95)";
              }}
              onMouseUp={() => {
                document.getElementById("osBtn").style.transform = "scale(1)";
              }}
              onMouseLeave={() => {
                document.getElementById("osBtn").style.transform = "scale(1)";
              }}
              onTouchStart={() => {
                document.getElementById("osBtn").style.transform =
                  "scale(0.95)";
              }}
              onTouchEnd={() => {
                document.getElementById("osBtn").style.transform = "scale(1)";
              }}
              className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
            >
              SERVICES
            </div>
          </a>
        </Link>

        <Link href="/contact" passHref>
          <a>
            <div
              id="csBtn"
              onMouseDown={() => {
                document.getElementById("csBtn").style.transform =
                  "scale(0.95)";
              }}
              onMouseUp={() => {
                document.getElementById("csBtn").style.transform = "scale(1)";
              }}
              onMouseLeave={() => {
                document.getElementById("csBtn").style.transform = "scale(1)";
              }}
              onTouchStart={() => {
                document.getElementById("csBtn").style.transform =
                  "scale(0.95)";
              }}
              onTouchEnd={() => {
                document.getElementById("csBtn").style.transform = "scale(1)";
              }}
              className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
            >
              CONTACT
            </div>
          </a>
        </Link>

        <Link href="/about" passHref>
          <a>
            <div
              id="aBtn"
              onMouseDown={() => {
                document.getElementById("aBtn").style.transform = "scale(0.95)";
              }}
              onMouseUp={() => {
                document.getElementById("aBtn").style.transform = "scale(1)";
              }}
              onMouseLeave={() => {
                document.getElementById("aBtn").style.transform = "scale(1)";
              }}
              onTouchStart={() => {
                document.getElementById("aBtn").style.transform = "scale(0.95)";
              }}
              onTouchEnd={() => {
                document.getElementById("aBtn").style.transform = "scale(1)";
              }}
              className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
            >
              ABOUT
            </div>
          </a>
        </Link>
        <Link href="/" passHref>
          <a>
            <div
              id="hBtn"
              onMouseDown={() => {
                document.getElementById("hBtn").style.transform = "scale(0.95)";
              }}
              onMouseUp={() => {
                document.getElementById("hBtn").style.transform = "scale(1)";
              }}
              onMouseLeave={() => {
                document.getElementById("hBtn").style.transform = "scale(1)";
              }}
              onTouchStart={() => {
                document.getElementById("hBtn").style.transform = "scale(0.95)";
              }}
              onTouchEnd={() => {
                document.getElementById("hBtn").style.transform = "scale(1)";
              }}
              className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
            >
              HOME
            </div>
          </a>
        </Link>
      </nav>
      <div className="absolute top-8 left-0 w-full bg-gradient-to-r from-white  to-accentColor text-white font-extrabold px-[10px] flex justify-between h-[50px] items-center">
        <div className="text-bgColor font-normal">
          {router.route == "/" && "HOMEPAGE"}
          {router.route == "/about" && "ABOUT PAGE"}
          {router.route == "/contact" && "CONTACT PAGE"}
          {router.route == "/onlineservices" && "SERVICES PAGE"}
          {router.route == "/forms/barangaycertificate-form" &&
            "BARANGAY CERTIFICATE APPLICATION"}
        </div>
        {user && <div className=" text-right" id="userNameDisplay"></div>}
      </div>
    </div>
  );
}
