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
import { ref, set, onValue, update, get, child, push } from "firebase/database";
import { BiPhoneCall, BiRadioCircleMarked } from "react-icons/bi";
import brgyLogo from "../public/imgs/logo.png";
import bgryImg from "../public/imgs/brgyImg.jpg";
import { GoUnverified, GoVerified } from "react-icons/go";
import { useRouter } from "next/router";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [toggleNav, setToggleNav] = useState(false);
  const route = useRouter();

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
        <title>Online Services</title>
      </Head>
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="bg-accentColor text-white font-extrabold p-[10px] flex flex-row justify-between">
          <div>ONLINE SERVICES</div>
          {user && <div id="userNameDisplay"></div>}
        </div>
        <div className=" bg-white flex gap-3 md:gap-5 w-full px-[10px] justify-end items-center h-[50px] mt-0 mb-0 mx-auto text-md md:text-lg font-extrabold ]">
          <Link href="/onlineservices" passHref>
            <a>
              <div className="cursor-pointer  hover:text-accentColor transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-accentColor">
                Online Services
              </div>
            </a>
          </Link>

          <Link href="/contact" passHref>
            <a>
              <div className="cursor-pointer  hover:text-accentColor transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-accentColor">
                Contact Us
              </div>
            </a>
          </Link>

          <Link href="/about" passHref>
            <a>
              <div className="cursor-pointer  hover:text-accentColor transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-accentColor">
                About
              </div>
            </a>
          </Link>
          <Link href="/" passHref>
            <a>
              <div className="cursor-pointer  hover:text-accentColor transition-all duration-300 ease-in-out border-b-2 border-transparent hover:border-accentColor">
                Home
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className=" w-full pt-32 flex flex-col">
        <div className="flex flex-row justify-center items-center w-fit mx-auto mb-5">
          <div className=" relative mx-auto flex items-center justify-cente h-[90px] md:h-[130px] w-[90px] md:w-[130px]">
            <Image src={brgyLogo}></Image>
          </div>
          <div className="font-extrabold  p-3">
            <div className="text-3xl">ONLINE SERVICES</div>
            <div className="text-xl">BARANGAY FORT BONIFACIO</div>
            <div className="h-1 w-full bg-bgColor"></div>
            <div className="text-lg">
              Quality Online Services We Offered For You
            </div>
          </div>
        </div>

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
                    onClick={() => {
                      route.push("/forms/barangaycertificate-form");
                    }}
                    className="bg-accentColor rounded-full font-extrabold px-4 py-2 mt-4"
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
                    Barangay Clearance / Certificate
                  </div>
                  <div className="text-md">For Personal Use</div>
                  <button className="bg-accentColor rounded-full font-extrabold px-4 py-2 mt-4">
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
                  <button className="bg-accentColor rounded-full font-extrabold px-4 py-2 mt-4">
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
    </div>
  );
}