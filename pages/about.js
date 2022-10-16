import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import aboutImg from "../public/imgs/aboutImg.jpg";
import dondy from "../public/imgs/dondy.jpg";
import andrea from "../public/imgs/andrea.jpg";
import jl from "../public/imgs/jl.jpg";
import rica from "../public/imgs/rica.jpg";
import sharm from "../public/imgs/sharm.jpg";
import elijah from "../public/imgs/elijah.jpg";
import rey from "../public/imgs/rey.jpg";
import kenu from "../public/imgs/kenu.jpg";
import gerand from "../public/imgs/gerand.png";
import Link from "next/link";
import { HiMenu, HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, set, onValue, update, get, child } from "firebase/database";

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
    <div className=" ">
      <Head>
        <title>Contact Us</title>
      </Head>
      <nav className="z-10 fixed top-0 left-0 right-0 w-screen mt-0 drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)] ">
        <div className=" relative hidden sm:flex flex-row bg-accentColor items-center h-20 mt-0 mb-0 mx-auto ">
          <div className=" mx-auto  flex gap-3 md:gap-5 justify-center items-center  text-md md:text-lg font-extrabold ">
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
                <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                  Contact Us
                </div>
              </a>
            </Link>

            <Link href="/about" passHref>
              <a>
                <div className="cursor-pointer text-gray-300 hover:text-white bg-bgColor rounded-lg px-3 leading-10">
                  About
                </div>
              </a>
            </Link>
          </div>
          {user && (
            <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-3  h-full w-[50px]  flex items-center  text-right flex-row-reverse">
              <div id="userNameDisplay"></div>
            </div>
          )}
        </div>
        <div className=" relative px-5 sm:hidden flex justify-between items-center h-[50px] bg-accentColor">
          <div
            onClick={() => setToggleNav(!toggleNav)}
            className=" text-[40px]"
          >
            <HiMenu />
          </div>
          {user && (
            <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-3  h-full w-[50px]  flex items-center text-right flex-row-reverse leading-4 ">
              <div id="userNameDisplay.m"></div>
            </div>
          )}
        </div>
      </nav>

      <div
        id="navMenu"
        className={`${
          toggleNav ? "translate-x-[0%]" : "translate-x-[-100%]"
        }  translate-x-[0%] transition-all ease-in-out duration-300 flex  flex-col justify-center gap-10 font-extrabold text-[35px] bg-accentColor fixed top-0 bottom-0 left-0 h-screen w-fit px-5  z-10 `}
      >
        <div
          onClick={() => setToggleNav(!toggleNav)}
          className="absolute top-5 left-5 text-[40px]"
        >
          <HiOutlineX />
        </div>

        <Link href="/" passHref>
          <a>
            <div>Home</div>
          </a>
        </Link>
        <Link href="/" passHref>
          <a>
            <div>Online Services</div>
          </a>
        </Link>
        <Link href="/contact" passHref>
          <a>
            <div>Contact Us</div>
          </a>
        </Link>
        <Link href="/about" passHref>
          <a>
            <div>About</div>
          </a>
        </Link>
      </div>

      <div className="w-full overflow-x-hidden h-screen drop-shadow-[0px_3px_3px_rgba(0,0,0,0.5)] scrollbar-thin scrollbar-thumb-accentColor scrollbar-track-bgColor">
        <div className="relative w-screen h-[60vh] mb-[5vh] overflow-hidden ">
          <Image
            className="w-screen h-auto object-center "
            objectFit="cover"
            layout="fill"
            src={aboutImg}
          />
        </div>
        <div className=" text-[30px] sm:text-[50px] font-extrabold text-center mt-0  ">
          OUR TEAM
        </div>
        <div className="mt-[5vh] mb-[20vh] text-justify w-[80%] sm:w-[50%] mx-auto">
          "The way a team plays as a whole determines its success. You may have
          the greatest bunch of individual stars in the world, but if they don’t
          play together, the club won’t be worth a dime." – Babe Ruth
        </div>
        <div className="w-screen h-fit p-10 flex flex-wrap justify-evenly gap-5 ">
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" src={dondy} />
            </div>
            <div>
              <div className="font-extrabold">JOHN ROD DONDOYANO</div>
              <div className="opacity-[50%]">Programmer/UI</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start  items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" src={andrea} />
            </div>
            <div>
              <div className="font-extrabold">ANDREA RINA VITORIO</div>
              <div className="opacity-[50%]">Programmer/UI</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" src={jl} />
            </div>
            <div>
              <div className="font-extrabold">JOHN LOUIE LOPEZ</div>
              <div className="opacity-[50%]">Programmer/UI</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" src={sharm} />
            </div>
            <div>
              <div className="font-extrabold">DANIELA SHARMELLE YLARAN</div>
              <div className="opacity-[50%]">Database Admin</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" src={gerand} />
            </div>
            <div>
              <div className="font-extrabold">GERAND SALAZAR</div>
              <div className="opacity-[50%]">Database Admin</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" className="" src={rey} />
            </div>
            <div>
              <div className="font-extrabold">JOHN REY MAQUIRANG</div>
              <div className="opacity-[50%]">Analyst/Documentation</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" className="" src={rica} />
            </div>
            <div>
              <div className="font-extrabold uppercase">Rica Mae Santos</div>
              <div className="opacity-[50%]">Tester/Documentation</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image
                objectFit="cover"
                layout="fill"
                className=""
                src={elijah}
              />
            </div>
            <div>
              <div className="font-extrabold uppercase">
                Elijah Paul Redondo
              </div>
              <div className="opacity-[50%]">Tester/Documentation</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit min-w-[500px]">
            <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
              <Image objectFit="cover" layout="fill" className="" src={kenu} />
            </div>
            <div>
              <div className="font-extrabold uppercase">
                Nehemiah Kenu Olegario
              </div>
              <div className="opacity-[50%]">Tester/Documentation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
