import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import hallImg from "../public/imgs/hallImg.webp";
import Link from "next/link";
import { HiMenu, HiOutlineX, HiOutlineHome } from "react-icons/hi";
import { BsQuestionCircle } from "react-icons/bs";
import {
  MdOutlineMiscellaneousServices,
  MdOutlineConnectWithoutContact,
} from "react-icons/md";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, set, onValue, update, get, child } from "firebase/database";
import { BiPhoneCall } from "react-icons/bi";
import brgyLogo from "../public/imgs/logo.png";
import bgryImg from "../public/imgs/brgyImg.jpg";
import { GoUnverified, GoVerified } from "react-icons/go";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [toggleNav, setToggleNav] = useState(false);

  function initMap() {}

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
    <div className="w-full h-screen">
      <Head>
        <title>Contact Us</title>
      </Head>
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="bg-accentColor text-white font-extrabold p-[10px] flex flex-row justify-between">
          <div>CONTACT</div>
          {user && <div id="userNameDisplay"></div>}
        </div>
        <div className=" text-bgColor bg-white flex gap-3 md:gap-5 w-full px-[10px] justify-end items-center h-[50px] mt-0 mb-0 mx-auto text-md md:text-lg font-extrabold ]">
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
                className="cursor-pointer  hover:text-accentColor transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-accentColor"
              >
                Online Services
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
                className="cursor-pointer  hover:text-accentColor transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-accentColor"
              >
                Contact Us
              </div>
            </a>
          </Link>

          <Link href="/about" passHref>
            <a>
              <div
                id="aBtn"
                onMouseDown={() => {
                  document.getElementById("aBtn").style.transform =
                    "scale(0.95)";
                }}
                onMouseUp={() => {
                  document.getElementById("aBtn").style.transform = "scale(1)";
                }}
                onMouseLeave={() => {
                  document.getElementById("aBtn").style.transform = "scale(1)";
                }}
                onTouchStart={() => {
                  document.getElementById("aBtn").style.transform =
                    "scale(0.95)";
                }}
                onTouchEnd={() => {
                  document.getElementById("aBtn").style.transform = "scale(1)";
                }}
                className="cursor-pointer  hover:text-accentColor transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-accentColor"
              >
                About
              </div>
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <div
                id="hBtn"
                onMouseDown={() => {
                  document.getElementById("hBtn").style.transform =
                    "scale(0.95)";
                }}
                onMouseUp={() => {
                  document.getElementById("hBtn").style.transform = "scale(1)";
                }}
                onMouseLeave={() => {
                  document.getElementById("hBtn").style.transform = "scale(1)";
                }}
                onTouchStart={() => {
                  document.getElementById("hBtn").style.transform =
                    "scale(0.95)";
                }}
                onTouchEnd={() => {
                  document.getElementById("hBtn").style.transform = "scale(1)";
                }}
                className="cursor-pointer  hover:text-accentColor transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-accentColor"
              >
                Home
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className="min-h-[100vh] mb-20 w-full pt-32 flex flex-col  text-bgColor">
        <div className="flex flex-row justify-center items-center w-fit mx-auto mb-5">
          <div className=" relative flex items-center justify-cente h-[90px] md:h-[130px] w-[90px] md:w-[130px] mx-[10px]">
            <Image src={brgyLogo}></Image>
          </div>
          <div className="font-extrabold  p-3">
            <div className="text-3xl">CONTACT US</div>
            <div className="text-xl">BARANGAY FORT BONIFACIO</div>
            <div className="h-1 w-full bg-bgColor"></div>
            <div className="text-lg">
              We are willing to assist you with your concerns.
            </div>
          </div>
        </div>

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
    </div>
  );
}
