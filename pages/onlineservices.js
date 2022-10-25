import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, get, child } from "firebase/database";
import { BiRadioCircleMarked } from "react-icons/bi";
import brgyLogo from "../public/imgs/logo.png";
import bgryImg from "../public/imgs/brgyImg.jpg";
import { useRouter } from "next/router";
import { motion as m } from "framer-motion";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  if (user) {
    const newEmail = user.email
      .replace(".com", "")
      .replace("@", "")
      .replace("#", "")
      .replace("$", "")
      .replace("[", "")
      .replace("]", "")
      .replace(".", "");

    get(child(ref(db), `users/${newEmail}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val().userName);
          document.getElementById("userNameDisplay").innerHTML =
            snapshot.val().userName;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="absolute top-56 left-0 h-[calc(100vh-224px)] w-full bg-white"
    >
      <Head>
        <title>Online Services</title>
      </Head>

      <div className=" w-full  flex flex-col text-bgColor">
        <div className="relative w-full min-h-full  bg-bgColor text-white flex flex-row justify-center">
          <div className=" w-full md:w-2/5 h-full py-20 px-10">
            <div className="flex flex-wrap flex-col p-0 mx-auto  w-full gap-10 ">
              <div className=" flex w-full justify-start">
                <div className="text-3xl text-accentColor">
                  <BiRadioCircleMarked />
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-2xl font-extrabold">
                    Business Clearance
                  </div>
                  <div className="text-md">Application/ Renewal/ Closure</div>
                  <button
                    id="btn1"
                    onMouseDown={() => {
                      document.getElementById("btn1").style.transform =
                        "scale(0.95)";
                    }}
                    onMouseUp={() => {
                      document.getElementById("btn1").style.transform =
                        "scale(1)";
                    }}
                    onMouseLeave={() => {
                      document.getElementById("btn1").style.transform =
                        "scale(1)";
                    }}
                    onTouchStart={() => {
                      document.getElementById("btn1").style.transform =
                        "scale(0.95)";
                    }}
                    onTouchEnd={() => {
                      document.getElementById("btn1").style.transform =
                        "scale(1)";
                    }}
                    onClick={() => {
                      route.push("/forms/barangaycertificate-form");
                    }}
                    className="bg-accentColor rounded-full font-extrabold px-4 hover:px-5 py-2 mt-4 transition-all duration-150 ease-in-out"
                  >
                    Click to Request
                  </button>
                </div>
              </div>
              <div className=" flex w-full justify-start">
                <div className="text-3xl text-accentColor">
                  <BiRadioCircleMarked />
                </div>
                <div className=" flex flex-col items-start">
                  <div className="text-2xl font-extrabold">
                    Barangay Clearance/ Certificate
                  </div>
                  <div className="text-md">For Personal Use</div>
                  <button
                    id="btn2"
                    onMouseDown={() => {
                      document.getElementById("btn2").style.transform =
                        "scale(0.95)";
                    }}
                    onMouseUp={() => {
                      document.getElementById("btn2").style.transform =
                        "scale(1)";
                    }}
                    onMouseLeave={() => {
                      document.getElementById("btn2").style.transform =
                        "scale(1)";
                    }}
                    onTouchStart={() => {
                      document.getElementById("btn2").style.transform =
                        "scale(0.95)";
                    }}
                    onTouchEnd={() => {
                      document.getElementById("btn2").style.transform =
                        "scale(1)";
                    }}
                    onClick={() => {}}
                    className="bg-accentColor rounded-full font-extrabold px-4 hover:px-5 py-2 mt-4 transition-all duration-150 ease-in-out"
                  >
                    Click to Request
                  </button>
                </div>
              </div>
              <div className=" flex w-full justify-start">
                <div className="text-3xl text-accentColor">
                  <BiRadioCircleMarked />
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-2xl font-extrabold">Barangay ID</div>
                  <div className="text-md">
                    Barangay ID for Fort Bonifacio Residents
                  </div>
                  <button
                    id="btn3"
                    onMouseDown={() => {
                      document.getElementById("btn3").style.transform =
                        "scale(0.95)";
                    }}
                    onMouseUp={() => {
                      document.getElementById("btn3").style.transform =
                        "scale(1)";
                    }}
                    onMouseLeave={() => {
                      document.getElementById("btn3").style.transform =
                        "scale(1)";
                    }}
                    onTouchStart={() => {
                      document.getElementById("btn3").style.transform =
                        "scale(0.95)";
                    }}
                    onTouchEnd={() => {
                      document.getElementById("btn3").style.transform =
                        "scale(1)";
                    }}
                    className="bg-accentColor rounded-full font-extrabold px-4 hover:px-5 py-2 mt-4 transition-all duration-150 ease-in-out"
                  >
                    Click to Request
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-4/5 min-h-[100px] bg-white relative hidden md:block">
            <Image
              className="w-full h-auto object-center "
              objectFit="cover"
              layout="fill"
              src={bgryImg}
            ></Image>
          </div>
        </div>
      </div>
      <div className=" p-10 w-full h-fit flex flex-row justify-center gap-6">
        <div className="h-[50px] w-[50px] rounded-full bg-bgColor"></div>
        <div className="h-[50px] w-[50px] rounded-full bg-bgColor"></div>
        <div className="h-[50px] w-[50px] rounded-full bg-bgColor"></div>
      </div>
      <div className=" text-center mb-0 mt-auto mx-auto font-thin opacity-[50%] text-[10px]">
        ©2022 BARANGAY FORT BONIFACIO
      </div>
    </m.div>
  );
}
