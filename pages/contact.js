import Head from "next/head";
import Image from "next/image";
import hallImg from "../public/imgs/hallImg.webp";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, get, child } from "firebase/database";
import { BiPhoneCall } from "react-icons/bi";
import brgyLogo from "../public/imgs/logo.png";
import { motion as m } from "framer-motion";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [toggleNav, setToggleNav] = useState(false);

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
      className="absolute top-56 left-0 h-screen w-full bg-white"
    >
      <Head>
        <title>Contact Us</title>
      </Head>

      <div className="min-h-[calc(100vh-224px)] mb-20 w-full flex flex-col  text-bgColor">
        <div className="w-full min-h-full  bg-bgColor text-white text-center flex flex-col justify-around gap-20 p-20">
          <div className="flex flex-wrap justify-evenly gap-20">
            <div className="w-[300px]">
              <div className="text-3xl  font-extrabold">MAIN OFFICE</div>
              <div className="text-lg mt-5">
                3rd Floor, Multi-Purpose Hall, Zone 3, Brgy. Fort Bonifacio,
                Lawton Avenue cor Pasong Tamo Extension, Taguig City
              </div>
              <div className="flex flex-row items-center justify-center gap-3 mt-5">
                <BiPhoneCall className="text-3xl bg-accentColor p-2 box-content rounded-full" />
                <div>
                  <div className="text-lg ">Tel: (02) 7750 7636</div>
                  <div className="text-lg ">Cel. No.: +63 9190 959 803</div>
                </div>
              </div>
            </div>

            <div className="w-[300px]">
              <div className="text-3xl  font-extrabold">SATELLITE OFFICE</div>
              <div className="text-lg mt-5">
                2nd Floor, Market Market & SM Aura 9th Floor Bonifacio Global
                City, Taguig City
              </div>
              <div className="flex flex-row items-center justify-center gap-3 mt-5">
                <BiPhoneCall className="text-3xl bg-accentColor p-2 box-content rounded-full" />
                <div>
                  <div className="text-lg ">Tel: (02) 7750 7636</div>
                  <div className="text-lg ">Cel. No.: +63 9190 959 803</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-evenly gap-20">
            <div className="w-[300px]">
              <div className="text-3xl  font-extrabold">PEACE AND ORDER</div>

              <div className="flex flex-row items-center justify-center gap-3 mt-5">
                <BiPhoneCall className="text-3xl bg-accentColor p-2 box-content rounded-full" />
                <div>
                  <div className="text-lg ">Tel: (02) 7750 7636</div>
                  <div className="text-lg ">Cel. No.: +63 9190 959 803</div>
                </div>
              </div>
            </div>

            <div className="w-[300px]">
              <div className="text-3xl  font-extrabold">EMERGENCY & RESCUE</div>

              <div className="flex flex-row items-center justify-center gap-3 mt-5">
                <BiPhoneCall className="text-3xl bg-accentColor p-2 box-content rounded-full" />
                <div>
                  <div className="text-lg ">Tel: (02) 7750 7636</div>
                  <div className="text-lg ">Cel. No.: +63 9190 959 803</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-screen overflow-hidden flex items-center justify-center  ">
        <div className=" m-auto relative h-full w-full overflow-hidden flex justify-center items-center">
          <Image src={hallImg} objectFit="cover" layout="fill"></Image>
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
