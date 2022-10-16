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
          document.getElementById("userNameDisplay.m").innerHTML =
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
    <div className="w-full h-screen scrollbar-thin scrollbar-thumb-accentColor scrollbar-track-bgColor ">
      <Head>
        <title>Contact Us</title>
      </Head>
      <nav className="z-10 fixed top-0 left-0 right-0 w-full mt-0 ">
        <div className=" relative hidden sm:flex flex-row bg-accentColor items-center h-20 mt-0 mb-0 mx-auto drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]">
          <div className=" mx-auto  flex gap-3 md:gap-5 justify-center items-center  text-md md:text-lg font-extrabold drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]">
            <Link href="/" passHref>
              <a>
                <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                  Home
                </div>
              </a>
            </Link>
            <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
              Online Services
            </div>

            <Link href="/contact" passHref>
              <a>
                <div className="cursor-pointer text-gray-300 hover:text-white bg-bgColor rounded-lg px-3 leading-10">
                  Contact Us
                </div>
              </a>
            </Link>

            <Link href="/about" passHref>
              <a>
                <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                  About
                </div>
              </a>
            </Link>
          </div>
          {user && (
            <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-3  h-full w-[50px]  flex items-center drop-shadow-[0px_3px_3px_rgba(0,0,0,0.5)] text-right flex-row-reverse">
              <div id="userNameDisplay"></div>
            </div>
          )}
        </div>
        <div className=" relative px-5 sm:hidden flex justify-between items-center h-[50px] bg-accentColor">
          <div
            onClick={() => setToggleNav(!toggleNav)}
            className=" text-[40px] drop-shadow-[0px_3px_1px_rgba(0,0,0,0.4)] "
          >
            <HiMenu />
          </div>
          {user && (
            <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-3  h-full w-[50px]  flex items-center drop-shadow-[0px_3px_3px_rgba(0,0,0,0.4)] text-right flex-row-reverse leading-4 ">
              <div id="userNameDisplay.m"></div>
            </div>
          )}
        </div>
      </nav>
      <div
        id="navMenu"
        className={`${
          toggleNav
            ? "translate-x-[0%] drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]"
            : "translate-x-[-100%]"
        }  translate-x-[0%] transition-all ease-in-out duration-300 flex  flex-col justify-center items-start gap-5 font-extrabold text-2xl bg-accentColor fixed top-0 bottom-0 left-0 h-screen w-fit px-5  z-10 text-white `}
      >
        <div
          onClick={() => setToggleNav(!toggleNav)}
          className="absolute top-5 left-5 text-[40px] drop-shadow-[0px_3px_1px_rgba(0,0,0,0.4)]"
        >
          <HiOutlineX
            className={`${
              toggleNav ? "rotate-[0deg]" : " rotate-[360deg]"
            } transition-all duration-1000 delay-200 ease-in-out `}
          />
        </div>

        <Link href="/" passHref>
          <a className="flex flex-row-reverse items-center gap-2 drop-shadow-[0px_3px_1px_rgba(0,0,0,0.4)]">
            <div
              className={`${
                toggleNav ? "text-2xl" : " text-sm"
              } transition-all duration-300 delay-200 ease-in-out `}
            >
              Home
            </div>
            <HiOutlineHome
              className={`${
                toggleNav ? "rotate-[0deg]" : " rotate-[360deg]"
              } transition-all duration-1000 delay-200 ease-in-out `}
            />
          </a>
        </Link>
        <Link href="/" passHref>
          <a className="flex flex-row-reverse items-center gap-2 drop-shadow-[0px_3px_1px_rgba(0,0,0,0.4)]">
            <div
              className={`${
                toggleNav ? "text-2xl" : " text-sm"
              } transition-all duration-300 delay-200 ease-in-out `}
            >
              Online Services
            </div>
            <MdOutlineMiscellaneousServices
              className={`${
                toggleNav ? "rotate-[0deg]" : " rotate-[360deg]"
              } transition-all duration-1000 delay-200 ease-in-out `}
            />
          </a>
        </Link>
        <Link href="/contact" passHref>
          <a className="flex flex-row-reverse items-center gap-2 drop-shadow-[0px_3px_1px_rgba(0,0,0,0.4)]">
            <div
              className={`${
                toggleNav ? "text-2xl" : " text-sm"
              } transition-all duration-300 delay-200 ease-in-out `}
            >
              Contact Us
            </div>
            <MdOutlineConnectWithoutContact
              className={`${
                toggleNav ? "rotate-[0deg]" : " rotate-[360deg]"
              } transition-all duration-1000 delay-200 ease-in-out `}
            />
          </a>
        </Link>
        <Link href="/about" passHref>
          <a className="flex flex-row-reverse items-center gap-2 drop-shadow-[0px_3px_1px_rgba(0,0,0,0.4)]">
            <div
              className={`${
                toggleNav ? "text-2xl " : " text-sm"
              } transition-all duration-300 delay-200 ease-in-out `}
            >
              About
            </div>
            <BsQuestionCircle
              className={`${
                toggleNav ? "rotate-[0deg]" : " rotate-[360deg]"
              } transition-all duration-1000 delay-200 ease-in-out `}
            />
          </a>
        </Link>
      </div>

      <div className=" w-full h-screen  text-center p-[10px] flex flex-col items-center justify-center drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)] ">
        <div className="text-[30px] sm:text-[50px] font-extrabold">
          CONTACT US
        </div>
        <div className="mt-[5vh] ">
          <div className="text-[20px] sm:text-[30px] font-extrabold text-accentColor">
            OUR OFFICE
          </div>
          <div className="text-[12px] sm:text-[13px]">
            2nd floor, Multi-Purpose Hall, Zone 1, Brgy. Fort Bonifacio, Lawton
            Ave cor Pasong Tamo extension, Taguig City
          </div>
          <div className="text-[12px] sm:text-[13px] mt-[2vh]">
            Tel No.: 02-8477-2106
          </div>
          <div className="text-[12px] sm:text-[13px]">
            Cel. No.: +63 9190 959 803 | +63 9255 458 001
          </div>
        </div>
        <div className="mt-[5vh] ">
          <div className="text-[20px] sm:text-[30px] font-extrabold text-accentColor">
            SATELLITE OFFICE
          </div>
          <div className="text-[12px] sm:text-[13px]">
            2nd Floor, Market Market & SM Aura 9th Floor Bonifacio Global City,
            Taguig City
          </div>
          <div className="text-[12px] sm:text-[13px] mt-[2vh]">
            Tel: (02) 7750 7636; Cel. No.: +63 925 545 8002
          </div>
        </div>
        <div className="mt-[5vh] ">
          <div className="text-[20px] sm:text-[30px] font-extrabold text-accentColor">
            PEACE AND ORDER
          </div>
          <div className="text-[12px] sm:text-[13px]">
            Cel. No.: +63 9255 453 465
          </div>
        </div>
        <div className="mt-[5vh] ">
          <div className="text-[20px] sm:text-[30px] font-extrabold text-accentColor">
            EMERGENCY & RESCUE
          </div>
          <div className="text-[12px] sm:text-[13px]">
            Cel. No.: +63 9255 453 469
          </div>
        </div>
      </div>

      <div className="w-full h-screen overflow-hidden flex items-center justify-center drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)] ">
        <div className=" rounded-lg m-auto relative h-[80%] w-[90%] overflow-hidden flex justify-center items-center">
          <Image src={hallImg} objectFit="cover" layout="fill"></Image>
        </div>
      </div>

      <div className="m-auto flex w-full overflow-hidden drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)] ">
        <div className="w-screen h-screen">
          <iframe
            className="rounded-lg w-[90%] h-[80%] m-auto"
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Fort Bonifacio&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
