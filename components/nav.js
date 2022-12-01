import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { ref, set, get, child } from "firebase/database";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { motion as m } from "framer-motion";
import { TiArrowBack } from "react-icons/ti";
import cityGirl from "../public/imgs/undrawCityGirl.svg";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Nav() {
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

  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 text-bgColor text-md md:text-lg bg-gradient-to-r from-white  to-accentColor h-[80px] font-medium">
        <nav className=" absolute z-10 top-0 left-0   flex gap-3 md:gap-5 w-full px-[10px] justify-end items-center h-[50px]  mb-0 mx-auto  ">
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
                className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
              >
                SERVICES
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
                className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
              >
                CONTACT
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
                className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
              >
                ABOUT
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
                className="cursor-pointer   transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
              >
                HOME
              </div>
            </a>
          </Link>
        </nav>
        <div className="absolute top-8 left-0 w-full   px-[10px] flex justify-end h-[50px] items-center">
          {user && (
            <div
              onClick={() => {
                router.push("/profile");
              }}
              className=" transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor cursor-pointer text-right  uppercase"
              id="userNameDisplay"
            ></div>
          )}
          {!user && (
            <div className="w-full flex justify-end gap-3 md:gap-5">
              <div
                onClick={() => {
                  setloadLogIn(true);
                }}
                className=" cursor-pointer  uppercase transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor"
              >
                Log In
              </div>
              <div
                onClick={() => {
                  setloadSignUp(true);
                }}
                className="transition-all duration-150 ease-in-out border-b-2 border-transparent hover:border-bgColor cursor-pointer  uppercase"
              >
                Sign Up
              </div>
            </div>
          )}
        </div>
      </div>

      {loadLogIn && (
        <div className="fixed top-0 left-0 right-0 z-10">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            exit={{ opacity: 0 }}
            key={loadLogIn}
            className="h-screen w-full flex  justify-center items-center z-20"
          >
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-75 -z-10"></div>
            <div className=" h-fit w-fit p-5 bg-accentColor rounded-lg  flex flex-row gap-10 relative scale-[0.75] md:scale-[1]">
              <a className=" z-10 absolute top-0 left-0 text-2xl">
                <div className=" absolute top-5 left-5 text-2xl cursor-pointer hover:scale-[1.5] transition-all ease-in-out ">
                  <TiArrowBack
                    onClick={() => {
                      setloadLogIn(false);
                    }}
                  />
                </div>
              </a>

              <div className=" m-auto relative w-[300px] h-[300px] overflow-hidden md:flex hidden">
                <Image src={cityGirl} objectPosition="center" layout="fill" />
              </div>

              <div className="w-[350px] flex flex-col gap-2 justify-center">
                <div className="text-white text-center font-extrabold mb-5 text-[45px] ">
                  Log In
                </div>
                <div className="flex items-center justify-between ">
                  <input
                    id="emailInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Email"
                  ></input>
                </div>

                <div className="flex items-center justify-between">
                  <input
                    id="passwordInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Password"
                    type="password"
                  ></input>
                </div>

                <br></br>
                <button
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
                    var email = document.getElementById("emailInput").value;
                    var password =
                      document.getElementById("passwordInput").value;

                    signInWithEmailAndPassword(auth, email, password)
                      .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        console.log(user.emailVerified);

                        setloadLogIn(false);
                        toast.success("Successfully Logged In!");

                        // ...
                      })
                      .catch((error) => {
                        toast.error(error.message);
                      });
                  }}
                  className="bg-white rounded-lg text-bgColor font-extrabold text-2xl w-fit px-6 hover:px-7 mx-auto transition-all duration-150 ease-in-out "
                >
                  Log In
                </button>

                <div className=" m-auto flex gap-2 mt-0 mb-0">
                  <span className="opacity-[80%] ">or</span>
                  <div
                    id="signInBtn"
                    onMouseDown={() => {
                      document.getElementById("signInBtn").style.transform =
                        "scale(0.98)";
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
                        "scale(0.98)";
                    }}
                    onTouchEnd={() => {
                      document.getElementById("signInBtn").style.transform =
                        "scale(1)";
                    }}
                    onClick={() => {
                      setloadLogIn(false);
                      setloadSignUp(true);
                    }}
                    className="opacity-[80%] hover:opacity-[100%] font-extrabold cursor-pointer transition-all ease-in-out]"
                  >
                    Sign Up
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      )}
      {loadSignUp && (
        <div className="fixed top-0 left-0 right-0 z-10">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            key={loadSignUp}
            exit={{ opacity: 0 }}
            className="h-screen w-full flex  justify-center items-center z-20"
          >
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black opacity-75 -z-10"></div>
            <div className=" h-fit w-fit p-5 bg-accentColor rounded-lg  flex flex-row gap-10 relative scale-[0.75] md:scale-[1]">
              <a className=" z-10 absolute top-0 left-0 text-2xl">
                <div className=" absolute top-5 left-5 text-2xl cursor-pointer hover:scale-[1.5] transition-all ease-in-out">
                  <TiArrowBack
                    onClick={() => {
                      setloadSignUp(false);
                    }}
                  />
                </div>
              </a>

              <div className=" m-auto relative w-[300px] h-[300px] overflow-hidden md:flex hidden">
                <Image src={cityGirl} objectPosition="center" layout="fill" />
              </div>

              <div className="w-[350px] flex flex-col gap-2 justify-center">
                <div className=" text-white text-center font-extrabold mb-5 text-[45px]">
                  Sign Up
                </div>
                <div className="flex items-center justify-between ">
                  <input
                    id="fnameInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="First Name"
                    type="text"
                  ></input>
                </div>
                <div className="flex items-center justify-between ">
                  <input
                    id="mnameInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Middle Name"
                    type="text"
                  ></input>
                </div>
                <div className="flex items-center justify-between ">
                  <input
                    id="lnameInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Last Name"
                    type="text"
                  ></input>
                </div>
                <div className="flex items-center justify-between ">
                  <input
                    id="emailInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Email"
                    type="email"
                  ></input>
                </div>
                <div className="flex items-center justify-between w-full">
                  <input
                    id="phoneInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Phone Number"
                  ></input>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    id="addressInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Address"
                  ></input>
                </div>
                <br></br>
                <div className="flex items-center justify-between">
                  <input
                    id="passwordInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Password"
                    type="password"
                  ></input>
                </div>
                <div className="flex items-center justify-between">
                  <input
                    id="passwordConfirmInput"
                    className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed  placeholder:text-gray-500 text-white"
                    placeholder="Confirm password "
                    type="password"
                  ></input>
                </div>
                <br></br>
                <button
                  id="signInBtn"
                  onMouseDown={() => {
                    document.getElementById("signInBtn").style.transform =
                      "scale(0.98)";
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
                      "scale(0.98)";
                  }}
                  onTouchEnd={() => {
                    document.getElementById("signInBtn").style.transform =
                      "scale(1)";
                  }}
                  onClick={() => {
                    var fnameInput =
                      document.getElementById("fnameInput").value;
                    var mnameInput =
                      document.getElementById("mnameInput").value;
                    var lnameInput =
                      document.getElementById("lnameInput").value;
                    var email = document.getElementById("emailInput").value;
                    var addressInput =
                      document.getElementById("addressInput").value;
                    var phoneInput =
                      document.getElementById("phoneInput").value;
                    var password =
                      document.getElementById("passwordInput").value;
                    var passwordCon = document.getElementById(
                      "passwordConfirmInput"
                    ).value;

                    if (
                      fnameInput.includes("0") ||
                      fnameInput.includes("1") ||
                      fnameInput.includes("2") ||
                      fnameInput.includes("3") ||
                      fnameInput.includes("4") ||
                      fnameInput.includes("5") ||
                      fnameInput.includes("6") ||
                      fnameInput.includes("7") ||
                      fnameInput.includes("8") ||
                      fnameInput.includes("9") ||
                      fnameInput.includes("9") ||
                      mnameInput.includes("0") ||
                      mnameInput.includes("1") ||
                      mnameInput.includes("2") ||
                      mnameInput.includes("3") ||
                      mnameInput.includes("4") ||
                      mnameInput.includes("5") ||
                      mnameInput.includes("6") ||
                      mnameInput.includes("7") ||
                      mnameInput.includes("8") ||
                      mnameInput.includes("9") ||
                      mnameInput.includes("9") ||
                      lnameInput.includes("0") ||
                      lnameInput.includes("1") ||
                      lnameInput.includes("2") ||
                      lnameInput.includes("3") ||
                      lnameInput.includes("4") ||
                      lnameInput.includes("5") ||
                      lnameInput.includes("6") ||
                      lnameInput.includes("7") ||
                      lnameInput.includes("8") ||
                      lnameInput.includes("9") ||
                      lnameInput.includes("9")
                    ) {
                      toast.error("I don't that's your name!");
                    } else {
                      if (
                        !email.includes("@") ||
                        !email.includes(".com") ||
                        !email.includes(".")
                      ) {
                        toast.error("Email is invalid!");
                      } else {
                        if (isNaN(phoneInput) || phoneInput.length != 11) {
                          toast.error("Phone number is invalid!");
                        } else {
                          if (
                            password.match(passwordCon) &&
                            passwordCon.match(password)
                          ) {
                            createUserWithEmailAndPassword(
                              auth,
                              email,
                              password
                            )
                              .then((userCredential) => {
                                // Signed in
                                const user = userCredential.user;

                                console.log(user);

                                const newEmail = user.email
                                  .replace(".com", "")
                                  .replace("@", "")
                                  .replace("#", "")
                                  .replace("$", "")
                                  .replace("[", "")
                                  .replace("]", "")
                                  .replace(".", "");

                                set(ref(db, "users/" + newEmail), {
                                  userFName: fnameInput,
                                  userMName: mnameInput,
                                  userLName: lnameInput,
                                  userName: `${fnameInput} ${mnameInput} ${lnameInput}`,
                                  userEmail: email,
                                  userAddress: addressInput,
                                  userPhone: phoneInput,
                                  userStatus: user.emailVerified,
                                });

                                setloadSignUp(false);
                                toast.success("Account Successfully created");
                                router.push("/profile");

                                // ...
                              })
                              .catch((error) => {
                                toast.error(error.code);
                                // ..
                              });
                          } else {
                            toast.error("Password did match!");
                          }
                        }
                      }
                    }
                  }}
                  className="bg-white rounded-lg text-bgColor font-extrabold text-2xl transition-all duration-150 ease-in-out "
                >
                  Register
                </button>
                <div className=" m-auto flex gap-2 mt-0 mb-0">
                  <span className="opacity-[80%] ">or</span>

                  <div
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
                      setloadLogIn(true);
                      setloadSignUp(false);
                    }}
                    className="opacity-[80%] hover:opacity-[100%] font-extrabold cursor-pointer transition-all ease-in-out]"
                  >
                    Log In
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </>
  );
}
