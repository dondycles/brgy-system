import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { useState } from "react";
import { motion as m } from "framer-motion";
import { toast } from "react-toastify";
import { HiHome, HiMail, HiPhone, HiOutlineDocumentText } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { RiHistoryLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { ref, update, get, child } from "firebase/database";
import { GoUnverified, GoVerified } from "react-icons/go";
import { useRouter } from "next/router";
import { sendEmailVerification } from "firebase/auth";

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();
  const [verifyClick, setVerifyClick] = useState(false);
  const [verifyReload, setVerifyReload] = useState(false);

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
          document.querySelector(".userNameDisplay").innerHTML =
            snapshot.val().userName;
          document.querySelector(".userPhoneDisplay").innerHTML =
            snapshot.val().userPhone;
          document.querySelector(".userAddressDisplay").innerHTML =
            snapshot.val().userAddress;
          document.querySelector(".userReqDateDisplay").innerHTML =
            snapshot.val().reqDate;
          document.querySelector(".noHis").style.display = "none";

          if (snapshot.val().reqDate == "" || snapshot.val().reqDate == null) {
            document.querySelector(".reqBrgyClr").style.display = "none";
            document.querySelector(".noHis").style.display = "block";
          }
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
      {user && (
        <m.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          exit={{ opacity: 0 }}
          id="scrl"
          className={`absolute top-56 left-0  w-full transition-all duration-300 ease-in-out
        `}
        >
          <div className="h-[calc(100vh-224px)] w-full  text-bgColor flex items-center justify-center">
            <div className="flex flex-col bg-accentColor md:px-20 px-10 md:py-20 py-10 text-white gap-5 rounded-xl">
              <div className="flex flex-col  gap-1  rounded-lg w-fit h-fit ">
                <div className="text-2xl font-bold flex flex-row items-center gap-2">
                  <CgProfile />
                  <div className="userNameDisplay "></div>
                  <>
                    {!user.emailVerified && <GoUnverified />}
                    {user.emailVerified && <GoVerified />}
                  </>
                </div>
                <div className="ml-8 mb-8">
                  <div className="flex flex-row items-center gap-2">
                    {user && (
                      <>
                        <HiMail /> <div>{user.email}</div>
                      </>
                    )}
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <HiHome /> <div className="userAddressDisplay w-fit"></div>{" "}
                    <BiEditAlt />
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <HiPhone /> <div className="userPhoneDisplay"></div>
                    <BiEditAlt />
                  </div>
                </div>

                <div className="text-xl font-bold flex flex-row items-center gap-2">
                  <RiHistoryLine /> REQUEST HISTORY
                </div>
                <div className="ml-8 mb-8">
                  {user && (
                    <>
                      <div className="reqBrgyClr flex flex-row items-center gap-2">
                        <HiOutlineDocumentText />
                        <div>Requested for Brgy. Clearance</div>
                        <div className="userReqDateDisplay"></div>
                      </div>
                    </>
                  )}
                  <div className="noHis">no history yet...</div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg w-fit h-fit gap-4 justify-center m-auto">
                {!user.emailVerified && (
                  <>
                    <div
                      className={` items-center gap-1 ${
                        verifyClick ? "hidden" : "flex"
                      }`}
                    >
                      <p className="m-0 p-0 ">please click </p>
                      <button
                        onClick={() => {
                          sendEmailVerification(auth.currentUser).then(() => {
                            console.log(user.emailVerified);
                            toast.success(
                              "Please check your inbox or spam folder and go back to this website!"
                            );
                          });
                          setVerifyClick(true);
                        }}
                        className=" bg-bgColor rounded-full my-0 px-4  py-1 transition-all ease-in-out duration-150"
                      >
                        VERIFY
                      </button>
                      <p>to be able to request documents </p>
                    </div>
                    <div
                      className={` items-center gap-1 ${
                        verifyClick ? "flex" : "hidden"
                      }`}
                    >
                      <p className="m-0 p-0 ">please click </p>
                      <button
                        onClick={() => {
                          location.reload();
                        }}
                        className=" bg-bgColor rounded-full my-0 px-4  py-1 transition-all ease-in-out duration-150"
                      >
                        CHECK VERIFICATION
                      </button>
                      <p>to check your verification status </p>
                    </div>
                  </>
                )}

                <button
                  onClick={() => {
                    route.push("/");
                    auth.signOut();
                  }}
                  className=" bg-bgColor rounded-full px-2 py-1 w-[200px]"
                >
                  LOG OUT
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </>
  );
}
