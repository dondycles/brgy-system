import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, set, onValue, update, get, child } from "firebase/database";
import { GoUnverified, GoVerified } from "react-icons/go";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";

import brgyLogo from "../public/imgs/logo.png";
import bgryImg from "../public/imgs/brgyImg.jpg";

export default function Home() {
  const [user, loading] = useAuthState(auth);
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
    <div id="scrl" className="relative h-screen w-full">
      <Head>
        <title>Brgy. Fort</title>
        <meta name="description" content="Welcome to Brgy. Fort!"></meta>
      </Head>

      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="bg-accentColor text-white font-extrabold p-[10px] flex justify-between">
          <div>HOME</div>
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

      <div className="h-[100vh] mb-20 w-full mt-32">
        <div className=" relative mx-auto flex items-center justify-cente h-[90px] md:h-[130px] w-[90px] md:w-[130px]">
          <Image src={brgyLogo}></Image>
        </div>
        <div className="text-center font-extrabold text-3xl p-3">
          BRGY. FORT BONIFACIO
        </div>

        <div className="relative w-full h-[50%] overflow-hidden ">
          <Image
            className="w-screen h-auto object-center "
            objectFit="cover"
            layout="fill"
            priority={true}
            src={bgryImg}
          />
        </div>

        <div className="w-full h-fit flex flex-col">
          {!user && (
            <div className="p-5 flex gap-1 flex-col m-auto]">
              <Link href="/signup" passHref>
                <a>
                  <div className="mx-auto my-auto flex items-center justify-center gap-3 bg-accentColor rounded-full px-5 py-1 cursor-pointer origin-center font-medium hover:font-extrabold hover:px-[22px] transition-all ease-in-out text-gray-300 hover:text-white w-fit ">
                    Sign In
                  </div>
                </a>
              </Link>

              <div className="mx-auto my-auto flex items-center justify-center gap-1 rounded-full px-5 py-1 font-thin transition-all ease-in-out text-black w-fit">
                or
                <Link href="/login">
                  <a>
                    <span className="text-accentColor cursor-pointer font-medium hover:font-extrabold transition-all ease-in-out">
                      Log In
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          )}

          {user && (
            <>
              <div className="p-3 flex gap-3 flex-col m-auto">
                <div className="m-auto text-center flex flex-row items-center gap-2 ]">
                  <span id="userNameDisplayCenter"></span>
                  <div>
                    {!user.emailVerified && (
                      <div className="flex items-center justify-center gap-2">
                        <GoUnverified />
                        <button
                          onClick={() => {
                            sendEmailVerification(auth.currentUser).then(() => {
                              console.log(user.emailVerified);
                              toast.success("Please check your email inbox!");
                            });
                          }}
                          className="bg-white rounded-full text-accentColor px-2 font-extrabold cursor-pointer"
                        >
                          verify
                        </button>
                      </div>
                    )}
                    {user.emailVerified && <GoVerified />}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => auth.signOut()}
                    className="mx-auto my-auto flex items-center justify-center gap-3 bg-accentColor rounded-full px-5 py-1 cursor-pointer origin-center font-medium hover:font-extrabold hover:px-[22px] transition-all ease-in-out text-gray-300 hover:text-white w-fit ]"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
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
          maxime enim. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Blanditiis quos voluptates reiciendis? Iure id, omnis voluptatum
          suscipit deserunt nulla soluta incidunt nihil voluptatibus expedita
          quo a ipsum, quas, consequatur repudiandae!
        </div>
      </div>

      <div className=" min-h-[100vh] px-[10px] py-20 w-full ">
        <div className="text-center text-3xl font-extrabold mb-20">
          ANY CONCERNS?
        </div>

        <div className="flex flex-col gap-20 ">
          <div className="w-full h-fit flex flex-row justify-center flex-wrap gap-20 text-xl">
            <div className=" relative w-full sm:w-fit flex flex-col gap-3">
              <div className="text-accentColor font-extrabold">Main Office</div>
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
    </div>
  );
}
