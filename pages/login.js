import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import cityGirl from "../public/imgs/undrawCityGirl.svg";
import { TiArrowBack } from "react-icons/ti";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function Login() {
  const route = useRouter();

  const [user, loading] = useAuthState(auth);

  if (user) {
    route.push("/");
  }

  return (
    <div className="className='fixed top-0 bottom-0 left-0 right-0 h-screen w-screen flex justify-center items-center bg-bgColor">
      <Head>
        <title>Log In</title>
      </Head>
      <div className="m-auto h-fit w-fit p-5 bg-accentColor rounded-lg  flex flex-row gap-10 relative scale-[0.75] md:scale-[1]">
        <Link href="/" passHref className="w-0">
          <a className=" z-10 absolute top-0 left-0 text-2xl">
            <div className=" absolute top-5 left-5 text-2xl cursor-pointer hover:scale-[1.5] transition-all ease-in-out ">
              <TiArrowBack />
            </div>
          </a>
        </Link>

        <div className=" m-auto relative w-[300px] h-[300px] overflow-hidden md:flex hidden">
          <Image src={cityGirl} objectPosition="center" layout="fill" />
        </div>

        <div className="w-[350px] flex flex-col gap-2 justify-center">
          <div className="text-white text-center font-extrabold mb-5 text-[45px] ">
            Log In
          </div>
          <div className="flex items-center justify-between ">
            <input
              id="emailInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Email"
            ></input>
          </div>

          <div className="flex items-center justify-between">
            <input
              id="passwordInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Password"
            ></input>
          </div>

          <br></br>
          <button
            id="logInBtn"
            onMouseDown={() => {
              document.getElementById("logInBtn").style.transform =
                "scale(0.98)";
            }}
            onMouseUp={() => {
              document.getElementById("logInBtn").style.transform = "scale(1)";
            }}
            onMouseLeave={() => {
              document.getElementById("logInBtn").style.transform = "scale(1)";
            }}
            onTouchStart={() => {
              document.getElementById("logInBtn").style.transform =
                "scale(0.98)";
            }}
            onTouchEnd={() => {
              document.getElementById("logInBtn").style.transform = "scale(1)";
            }}
            onClick={() => {
              var email = document.getElementById("emailInput").value;
              var password = document.getElementById("passwordInput").value;

              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  console.log(user.emailVerified);

                  // ...
                })
                .catch((error) => {
                  toast.error(error.message);
                });
            }}
            className="bg-white rounded-lg text-bgColor font-extrabold text-2xl w-fit px-6 hover:px-7 mx-auto transition-all duration-150 ease-in-out "
          >
            Log In
          </button>

          <div className=" m-auto flex gap-2 mt-0 mb-0">
            <span className="opacity-[80%] ">or</span>
            <div
              id="signInBtn"
              onMouseDown={() => {
                document.getElementById("signInBtn").style.transform =
                  "scale(0.98)";
              }}
              onMouseUp={() => {
                document.getElementById("signInBtn").style.transform =
                  "scale(1)";
              }}
              onMouseLeave={() => {
                document.getElementById("signInBtn").style.transform =
                  "scale(1)";
              }}
              onTouchStart={() => {
                document.getElementById("signInBtn").style.transform =
                  "scale(0.98)";
              }}
              onTouchEnd={() => {
                document.getElementById("signInBtn").style.transform =
                  "scale(1)";
              }}
              onClick={() => {
                setTimeout(() => {
                  route.push("/signup");
                }, 500);
              }}
              className="opacity-[80%] hover:opacity-[100%] font-extrabold cursor-pointer transition-all ease-in-out]"
            >
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
