import Head from "next/head";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, update, get, child } from "firebase/database";
import { GoUnverified, GoVerified } from "react-icons/go";
import { ImArrowDown } from "react-icons/im";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

import { useState } from "react";
import { motion as m } from "framer-motion";

import brgyLogo from "../public/imgs/logo.png";
import bgryImg from "../public/imgs/brgyImg.jpg";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  const [loadSignUp, setloadSignUp] = useState(false);
  const [loadLogIn, setloadLogIn] = useState(false);

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
          document.getElementById("userNameDisplayCenter").innerHTML =
            snapshot.val().userName;
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    if (user.emailVerified) {
      update(ref(db, "users/" + newEmail), {
        userStatus: user.emailVerified,
      });
    }
  }

  return (
    <>
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        exit={{ opacity: 0 }}
        id="scrl"
        className={`absolute top-56 left-0  w-full bg-white transition-all duration-300 ease-in-out
        ${loadLogIn ? "blur-sm brightness-50" : ""}
        ${loadSignUp ? "blur-sm brightness-50" : ""}
        `}
      >
        <Head>
          <title>Brgy. Fort</title>
          <meta name="description" content="Welcome to Brgy. Fort!"></meta>
        </Head>

        <div className="h-[calc(100vh-224px)] w-full  text-bgColor">
          <div className="relative w-full h-[100%] overflow-hidden ">
            <Image
              objectFit="cover"
              layout="fill"
              priority={true}
              src={bgryImg}
            />
          </div>
        </div>

        <div className="relative min-h-[40vh] w-full">
          <div className="text-center text-3xl font-extrabold p-3">
            ANNOUNCEMENTS
          </div>
          <div className="w-full h-full bg-accentColor flex flex-wrap justify-center p-3 gap-3">
            <div className="h-[400px] min-w-[300px] bg-white rounded-xl"></div>
            <div className="h-[400px] min-w-[300px] bg-white rounded-xl"></div>
            <div className="h-[400px] min-w-[300px] bg-white rounded-xl"></div>
            <div className="h-[400px] min-w-[300px] bg-white rounded-xl"></div>
          </div>
        </div>

        <div
          id="aboutPage"
          className="min-h-[100vh] w-full my-6 py-3 px-[10px] flex flex-col"
        >
          <div className="flex items-center justify-center w-fit gap-3">
            <div>
              <Image width={100} height={100} src={brgyLogo}></Image>
            </div>
            <div className="font-extrabold">
              <div className="text-3xl">ABOUT US</div>
              <div>BARANGAY FORT BONIFACIO</div>
            </div>
          </div>
          <div className=" bg-accentColor p-10 text-justify w-full sm:w-[600px] rounded-lg mx-auto text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
            placeat dolore consequatur qui illo sit similique corrupti corporis
            repudiandae odio velit id eaque iusto, tempora reiciendis minus
            veritatis saepe esse? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Officiis voluptatem laborum deserunt perferendis
            corrupti voluptates, quam vitae sapiente rem distinctio tempora hic
            praesentium quibusdam recusandae modi ipsam et nostrum ipsa?Lorem
            ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
            corporis quidem ullam tempora iste nisi quas, distinctio aliquid
            fugiat. Nisi molestiae quis ea natus provident explicabo iure dolor
            maxime enim. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Blanditiis quos voluptates reiciendis? Iure id, omnis
            voluptatum suscipit deserunt nulla soluta incidunt nihil
            voluptatibus expedita quo a ipsum, quas, consequatur repudiandae!
          </div>
        </div>

        <div className=" min-h-[100vh] px-[10px] py-20 w-full ">
          <div className="text-center text-3xl font-extrabold mb-20">
            ANY CONCERNS?
          </div>

          <div className="flex flex-col gap-20 ">
            <div className="w-full h-fit flex flex-row justify-center flex-wrap gap-20 text-xl">
              <div className=" relative w-full sm:w-fit flex flex-col gap-3">
                <div className="text-accentColor font-extrabold">
                  Main Office
                </div>
                <div className="w-full sm:w-[500px] h-[200px] bg-bgColor rounded-xl"></div>
              </div>
              <div className="relative w-full sm:w-fit flex flex-col gap-3">
                <div className="text-accentColor font-extrabold">
                  Satellite Office
                </div>
                <div className="w-full sm:w-[500px] h-[200px] bg-bgColor rounded-xl"></div>
              </div>
            </div>
            <div className="w-full h-fit flex flex-row justify-center  flex-wrap gap-20 text-xl">
              <div className="relative w-full sm:w-fit flex flex-col gap-3">
                <div className="text-accentColor font-extrabold">
                  Peace and Order
                </div>
                <div className="w-full sm:w-[500px] h-[200px] bg-bgColor rounded-xl"></div>
              </div>
              <div className="relative w-full sm:w-fit flex flex-col gap-3">
                <div className="text-accentColor font-extrabold">
                  Emergency Rescue
                </div>
                <div className="w-full sm:w-[500px] h-[200px] bg-bgColor rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-auto flex flex-col px-[10px] min-h-fit py-20 w-full  overflow-hidden] ">
          <div className="text-3xl font-extrabold text-center pb-10">
            OUR LOCATION
          </div>
          <div className="w-full h-[500px] ">
            <iframe
              className=" rounded-lg w-full sm:w-2/3 h-full m-auto"
              src="https://maps.google.com/maps?hl=en&amp;q=Fort Bonifacio&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
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
    </>
  );
}
