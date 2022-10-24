import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, set, onValue, update, get, child } from "firebase/database";
import { GoUnverified, GoVerified } from "react-icons/go";
import { ImArrowDown } from "react-icons/im";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import { useState } from "react";

import brgyLogo from "../public/imgs/logo.png";
import bgryImg from "../public/imgs/brgyImg.jpg";
import { useRouter } from "next/router";

export default function Home() {
  const [user, loading] = useAuthState(auth);
  const [verifyClick, setVerifyClick] = useState(false);
  const [verifyReload, setVerifyReload] = useState(false);
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
          {user && <div className=" text-right" id="userNameDisplay"></div>}
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

      <div className="h-[100vh] mb-20 w-full pt-28 text-bgColor">
        <div className="flex mx-auto items-center justify-center mb-2">
          <div className=" relative  flex items-center justify-cente h-[50px] md:h-[130px] w-[50px] md:w-[130px]">
            <Image src={brgyLogo}></Image>
          </div>
          <div className="text-center font-extrabold text-xl md:text-3xl p-3">
            BRGY. FORT BONIFACIO
          </div>
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

        <div className="w-full h-fit flex flex-col  text-bgColor">
          {!user && (
            <div className="p-5 flex gap-1 flex-col m-auto]">
              <div
                id="signInBtn"
                onMouseDown={() => {
                  document.getElementById("signInBtn").style.transform =
                    "scale(0.95)";
                }}
                onMouseUp={() => {
                  document.getElementById("signInBtn").style.transform =
                    "scale(1)";
                }}
                onMouseLeave={() => {
                  document.getElementById("signInBtn").style.transform =
                    "scale(1)";
                }}
                onTouchStart={() => {
                  document.getElementById("signInBtn").style.transform =
                    "scale(0.95)";
                }}
                onTouchEnd={() => {
                  document.getElementById("signInBtn").style.transform =
                    "scale(1)";
                }}
                onClick={() => {
                  setTimeout(() => {
                    route.push("/signup");
                  }, 500);
                }}
                className={`mx-auto my-auto flex items-center justify-center gap-3 bg-accentColor rounded-full px-5 py-1 cursor-pointer origin-center font-medium hover:font-extrabold hover:px-[22px] transition-all ease-in-out text-gray-150 hover:text-white w-fit 
                    `}
              >
                Sign In
              </div>

              <div className="mx-auto my-auto flex items-center justify-center gap-1 rounded-full px-5 py-1 font-thin transition-all ease-in-out text-black w-fit">
                or
                <span
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
                  className="text-accentColor opacity-[80%] hover:opacity-[100%] font-extrabold cursor-pointer transition-all ease-in-out"
                >
                  Log In
                </span>
              </div>
            </div>
          )}

          {user && (
            <>
              <div className="p-3 flex gap-3 flex-col m-auto">
                <div className="m-auto text-center flex flex-col items-center ]">
                  <div>
                    {!user.emailVerified && (
                      <div className="relative">
                        <div className="flex items-center flex-row justify-center gap-2">
                          <span id="userNameDisplayCenter"></span>

                          <GoUnverified />
                        </div>
                        <div
                          className={`dialogue absolute top-[-100%] left-[50%] translate-x-[-50%] bg-bgColor px-4 py-2 rounded-lg text-white  w-[300px] animate-dialougeAnim  ${
                            verifyReload ? "block" : "hidden"
                          } `}
                        >
                          Click this after clicking the confirmation link that
                          has been sent to your email inbox/spam
                        </div>
                        <div
                          className={`dialogue absolute top-[-100%] left-[50%] translate-x-[-50%] bg-bgColor px-4 py-2 rounded-lg text-white  w-[300px] animate-dialougeAnim ${
                            verifyReload ? "hidden" : "block"
                          } `}
                        >
                          Click this to verify your account. You must be verfied
                          first to be eligble for requesting documents!
                        </div>
                        <ImArrowDown
                          className={`absolute top-[25%] left-[50%] translate-x-[-50%] `}
                        />
                        <button
                          onClick={() => {
                            sendEmailVerification(auth.currentUser).then(() => {
                              console.log(user.emailVerified);
                              toast.success(
                                "Please check your inbox or spam folder and go back to this website!"
                              );
                            });
                            setVerifyClick(true);
                            setVerifyReload(true);
                          }}
                          id="verifyBtn"
                          onMouseDown={() => {
                            document.getElementById(
                              "verifyBtn"
                            ).style.transform = "scale(0.95)";
                          }}
                          onMouseUp={() => {
                            document.getElementById(
                              "verifyBtn"
                            ).style.transform = "scale(1)";
                          }}
                          onMouseLeave={() => {
                            document.getElementById(
                              "verifyBtn"
                            ).style.transform = "scale(1)";
                          }}
                          onTouchStart={() => {
                            document.getElementById(
                              "verifyBtn"
                            ).style.transform = "scale(0.95)";
                          }}
                          onTouchEnd={() => {
                            document.getElementById(
                              "verifyBtn"
                            ).style.transform = "scale(1)";
                          }}
                          className={`bg-bgColor rounded-full mt-3 mx-auto text-white px-4 hover:px-6 transition-all duration-150 ease-in-out py-1 font-extrabold cursor-pointer text-center ${
                            verifyClick ? "hidden" : "block"
                          }`}
                        >
                          verify
                        </button>
                        <button
                          onClick={() => {
                            location.reload();
                          }}
                          id="chkverifyBtn"
                          onMouseDown={() => {
                            document.getElementById(
                              "chkverifyBtn"
                            ).style.transform = "scale(0.95)";
                          }}
                          onMouseUp={() => {
                            document.getElementById(
                              "chkverifyBtn"
                            ).style.transform = "scale(1)";
                          }}
                          onMouseLeave={() => {
                            document.getElementById(
                              "chkverifyBtn"
                            ).style.transform = "scale(1)";
                          }}
                          onTouchStart={() => {
                            document.getElementById(
                              "chkverifyBtn"
                            ).style.transform = "scale(0.95)";
                          }}
                          onTouchEnd={() => {
                            document.getElementById(
                              "chkverifyBtn"
                            ).style.transform = "scale(1)";
                          }}
                          className={`bg-bgColor rounded-full mt-3 mx-auto text-white px-4 hover:px-6 transition-all duration-150 ease-in-out py-1 font-extrabold cursor-pointer text-center  ${
                            verifyClick ? "block" : "hidden"
                          }`}
                        >
                          check verification
                        </button>
                      </div>
                    )}
                    {user.emailVerified && <GoVerified />}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => auth.signOut()}
                    className="mx-auto my-auto flex items-center justify-center gap-3 bg-accentColor rounded-full px-5 py-1 cursor-pointer origin-center font-medium hover:font-extrabold hover:px-[22px] transition-all ease-in-out text-gray-150 hover:text-white w-fit ]"
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
