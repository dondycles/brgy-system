import Head from "next/head";
import Image from "next/image";
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

import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, get, child } from "firebase/database";
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
        <title>About</title>
      </Head>

      <div className="w-full h-[calc(100vh-224px)]  text-bgColor">
        <div className="relative w-full h-[60%] mb-[5vh] overflow-hidden ">
          <Image objectFit="cover" layout="fill" src={aboutImg} />
        </div>
        <div className=" text-[30px] sm:text-[50px] font-extrabold text-center mt-0  ">
          OUR TEAM
        </div>
        <div className="mt-[5vh] mb-[20vh] text-justify w-[80%] sm:w-[50%] mx-auto">
          "The way a team plays as a whole determines its success. You may have
          the greatest bunch of individual stars in the world, but if they don’t
          play together, the club won’t be worth a dime." – Babe Ruth
        </div>
      </div>
      <div className="w-full h-fit p-10 flex flex-wrap justify-evenly gap-5 ">
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" src={dondy} />
          </div>
          <div>
            <div className="font-extrabold">JOHN ROD DONDOYANO</div>
            <div className="opacity-[50%]">Programmer/UI</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start  items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" src={andrea} />
          </div>
          <div>
            <div className="font-extrabold">ANDREA RINA VITORIO</div>
            <div className="opacity-[50%]">Programmer/UI</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" src={jl} />
          </div>
          <div>
            <div className="font-extrabold">JOHN LOUIE LOPEZ</div>
            <div className="opacity-[50%]">Programmer/UI</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" src={sharm} />
          </div>
          <div>
            <div className="font-extrabold">DANIELA SHARMELLE YLARAN</div>
            <div className="opacity-[50%]">Database Admin</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" src={gerand} />
          </div>
          <div>
            <div className="font-extrabold">GERAND SALAZAR</div>
            <div className="opacity-[50%]">Database Admin</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" className="" src={rey} />
          </div>
          <div>
            <div className="font-extrabold">JOHN REY MAQUIRANG</div>
            <div className="opacity-[50%]">Analyst/Documentation</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" className="" src={rica} />
          </div>
          <div>
            <div className="font-extrabold uppercase">Rica Mae Santos</div>
            <div className="opacity-[50%]">Tester/Documentation</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
          <div className="relative min-w-[200px] h-[200px] overflow-hidden rounded-xl">
            <Image objectFit="cover" layout="fill" className="" src={elijah} />
          </div>
          <div>
            <div className="font-extrabold uppercase">Elijah Paul Redondo</div>
            <div className="opacity-[50%]">Tester/Documentation</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-3 h-fit sm:min-w-[500px] w-[300px]">
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
