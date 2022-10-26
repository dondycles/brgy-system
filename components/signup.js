import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import cityGirl from "../public/imgs/undrawCityGirl.svg";
import { TiArrowBack } from "react-icons/ti";
import { useAuthState } from "react-firebase-hooks/auth";
import Router, { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { ref, set } from "firebase/database";
import { motion as m } from "framer-motion";

export default function Signup() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  return (
    <m.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="bg-black h-screen w-full flex  justify-center items-center z-20"
    >
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className=" h-fit w-fit p-5 bg-accentColor rounded-lg  flex flex-row gap-10 relative scale-[0.75] md:scale-[1]">
        <Link href="/" passHref className="w-0">
          <a className=" z-10 absolute top-0 left-0 text-2xl">
            <div className=" absolute top-5 left-5 text-2xl cursor-pointer hover:scale-[1.5] transition-all ease-in-out">
              <TiArrowBack />
            </div>
          </a>
        </Link>

        <div className=" m-auto relative w-[300px] h-[300px] overflow-hidden md:flex hidden">
          <Image src={cityGirl} objectPosition="center" layout="fill" />
        </div>

        <div className="w-[350px] flex flex-col gap-2 justify-center">
          <div className=" text-white text-center font-extrabold mb-5 text-[45px]">
            Sign Up
          </div>
          <div className="flex items-center justify-between ">
            <input
              id="fnameInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="First Name"
              type="text"
            ></input>
          </div>
          <div className="flex items-center justify-between ">
            <input
              id="mnameInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Middle Name"
              type="text"
            ></input>
          </div>
          <div className="flex items-center justify-between ">
            <input
              id="lnameInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Last Name"
              type="text"
            ></input>
          </div>
          <div className="flex items-center justify-between ">
            <input
              id="emailInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Email"
              type="email"
            ></input>
          </div>
          <div className="flex items-center justify-between w-full">
            <input
              id="phoneInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Phone Number"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <input
              id="addressInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Address"
            ></input>
          </div>
          <br></br>
          <div className="flex items-center justify-between">
            <input
              id="passwordInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Password"
              type="text"
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <input
              id="passwordConfirmInput"
              className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
              placeholder="Confirm password "
            ></input>
          </div>
          <br></br>
          <button
            id="signInBtn"
            onMouseDown={() => {
              document.getElementById("signInBtn").style.transform =
                "scale(0.98)";
            }}
            onMouseUp={() => {
              document.getElementById("signInBtn").style.transform = "scale(1)";
            }}
            onMouseLeave={() => {
              document.getElementById("signInBtn").style.transform = "scale(1)";
            }}
            onTouchStart={() => {
              document.getElementById("signInBtn").style.transform =
                "scale(0.98)";
            }}
            onTouchEnd={() => {
              document.getElementById("signInBtn").style.transform = "scale(1)";
            }}
            onClick={() => {
              var fnameInput = document.getElementById("fnameInput").value;
              var mnameInput = document.getElementById("mnameInput").value;
              var lnameInput = document.getElementById("lnameInput").value;
              var email = document.getElementById("emailInput").value;
              var addressInput = document.getElementById("addressInput").value;
              var phoneInput = document.getElementById("phoneInput").value;
              var password = document.getElementById("passwordInput").value;
              var passwordCon = document.getElementById(
                "passwordConfirmInput"
              ).value;

              if (
                fnameInput.includes("0") ||
                fnameInput.includes("1") ||
                fnameInput.includes("2") ||
                fnameInput.includes("3") ||
                fnameInput.includes("4") ||
                fnameInput.includes("5") ||
                fnameInput.includes("6") ||
                fnameInput.includes("7") ||
                fnameInput.includes("8") ||
                fnameInput.includes("9") ||
                fnameInput.includes("9") ||
                mnameInput.includes("0") ||
                mnameInput.includes("1") ||
                mnameInput.includes("2") ||
                mnameInput.includes("3") ||
                mnameInput.includes("4") ||
                mnameInput.includes("5") ||
                mnameInput.includes("6") ||
                mnameInput.includes("7") ||
                mnameInput.includes("8") ||
                mnameInput.includes("9") ||
                mnameInput.includes("9") ||
                lnameInput.includes("0") ||
                lnameInput.includes("1") ||
                lnameInput.includes("2") ||
                lnameInput.includes("3") ||
                lnameInput.includes("4") ||
                lnameInput.includes("5") ||
                lnameInput.includes("6") ||
                lnameInput.includes("7") ||
                lnameInput.includes("8") ||
                lnameInput.includes("9") ||
                lnameInput.includes("9")
              ) {
                toast.error("I don't that's your name!");
              } else {
                if (
                  !email.includes("@") ||
                  !email.includes(".com") ||
                  !email.includes(".")
                ) {
                  toast.error("Email is invalid!");
                } else {
                  if (isNaN(phoneInput) || phoneInput.length != 11) {
                    toast.error("Phone number is invalid!");
                  } else {
                    if (
                      password.match(passwordCon) &&
                      passwordCon.match(password)
                    ) {
                      createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                          // Signed in
                          const user = userCredential.user;

                          console.log(user);

                          const newEmail = user.email
                            .replace(".com", "")
                            .replace("@", "")
                            .replace("#", "")
                            .replace("$", "")
                            .replace("[", "")
                            .replace("]", "")
                            .replace(".", "");

                          set(ref(db, "users/" + newEmail), {
                            userFName: fnameInput,
                            userMName: mnameInput,
                            userLName: lnameInput,
                            userName: `${fnameInput} ${mnameInput} ${lnameInput}`,
                            userEmail: email,
                            userAddress: addressInput,
                            userPhone: phoneInput,
                            userStatus: user.emailVerified,
                          });

                          route.push("/profile");

                          // ...
                        })
                        .catch((error) => {
                          toast.error(error.code);
                          // ..
                        });
                    } else {
                      toast.error("Password did match!");
                    }
                  }
                }
              }
            }}
            className="bg-white rounded-lg text-bgColor font-extrabold text-2xl transition-all duration-150 ease-in-out "
          >
            Register
          </button>
          <div className=" m-auto flex gap-2 mt-0 mb-0">
            <span className="opacity-[80%] ">or</span>

            <div
              id="logInBtn"
              onMouseDown={() => {
                document.getElementById("logInBtn").style.transform =
                  "scale(0.98)";
              }}
              onMouseUp={() => {
                document.getElementById("logInBtn").style.transform =
                  "scale(1)";
              }}
              onMouseLeave={() => {
                document.getElementById("logInBtn").style.transform =
                  "scale(1)";
              }}
              onTouchStart={() => {
                document.getElementById("logInBtn").style.transform =
                  "scale(0.98)";
              }}
              onTouchEnd={() => {
                document.getElementById("logInBtn").style.transform =
                  "scale(1)";
              }}
              onClick={() => {
                setTimeout(() => {
                  route.push("/login");
                }, 500);
              }}
              className="opacity-[80%] hover:opacity-[100%] font-extrabold cursor-pointer transition-all ease-in-out]"
            >
              Log In
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}
