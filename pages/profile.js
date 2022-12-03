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

          document.querySelector(".noHis").style.display = "none";
          var no1 = false;
          var no2 = false;
          var no3 = false;

          if (
            snapshot.val().brgyCertReqDate == "" ||
            snapshot.val().brgyCertReqDate == null ||
            snapshot.val().brgyCertReqDate == undefined
          ) {
            document.querySelector(".reqBrgyClr").style.display = "none";
            no1 = true;
          } else {
            document.querySelector(".userbrgyCertReqDateDisplay").innerHTML =
              snapshot.val().brgyCertReqDate;
          }

          if (
            snapshot.val().brgyIdReqDate == "" ||
            snapshot.val().brgyIdReqDate == null ||
            snapshot.val().brgyIdReqDate == undefined
          ) {
            document.querySelector(".reqBrgyId").style.display = "none";
            no2 = true;
          } else {
            document.querySelector(".userbrgyIdReqDateDisplay").innerHTML =
              snapshot.val().brgyIdReqDate;
          }

          if (
            snapshot.val().bsnsCertReqDate == "" ||
            snapshot.val().bsnsCertReqDate == null ||
            snapshot.val().bsnsCertReqDate == undefined
          ) {
            document.querySelector(".reqBsnsClr").style.display = "none";
            no3 = true;
          } else {
            document.querySelector(".userBsnsCertReqDateDisplay").innerHTML =
              snapshot.val().bsnsCertReqDate;
          }

          if (no1 == true && no2 == true && no3 == true) {
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
          <div className="h-[calc(100vh-224px)] w-full bg-bgColor  text-bgColor flex items-center justify-center">
            <div className="flex flex-col bg-gradient-to-r from-white  to-accentColor sm:md-20px md:px-10 px-5 md:py-20 py-10  gap-5 rounded-xl text-bgColor">
              <div className="flex flex-col  gap-1  rounded-lg w-fit h-fit ">
                <div className=" md:text-2xl text-md font-bold flex flex-row items-center gap-2">
                  <CgProfile />
                  <div className="userNameDisplay"></div>
                  <>
                    {!user.emailVerified && <GoUnverified />}
                    {user.emailVerified && <GoVerified />}
                  </>
                </div>
                <div className="ml-8 mb-8 md:text-md text-sm">
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

                <div className=" md:text-2xl text-md font-bold flex flex-row items-center gap-2">
                  <RiHistoryLine /> REQUEST HISTORY
                </div>
                <div className="ml-8 mb-8 md:text-md text-sm">
                  {user && (
                    <>
                      <div className="reqBrgyClr flex flex-row items-center gap-2">
                        <HiOutlineDocumentText />
                        <div>Requested for Brgy. Clearance</div>
                        <div className="userbrgyCertReqDateDisplay"></div>
                      </div>
                      <div className="reqBrgyId flex flex-row items-center gap-2">
                        <HiOutlineDocumentText />
                        <div>Requested for Brgy. ID</div>
                        <div className="userbrgyIdReqDateDisplay"></div>
                      </div>
                      <div className="reqBsnsClr flex flex-row items-center gap-2">
                        <HiOutlineDocumentText />
                        <div>Requested for Business Clearance</div>
                        <div className="userBsnsCertReqDateDisplay"></div>
                      </div>
                    </>
                  )}
                  <div className="noHis">no history yet...</div>
                </div>
              </div>
              <div className="flex flex-col rounded-lg w-fit h-fit gap-1 justify-center m-auto">
                {!user.emailVerified && (
                  <>
                    <div
                      className={` items-center gap-1 text-sm w-full text-justify mb-4 ${
                        verifyClick ? "hidden" : "flex"
                      }`}
                    >
                      <p className="m-0 p-0 ">
                        please click
                        <span
                          onClick={() => {
                            sendEmailVerification(auth.currentUser).then(() => {
                              console.log(user.emailVerified);
                              toast.success(
                                "Please check your inbox or spam folder and go back to this website!"
                              );
                            });
                            setVerifyClick(true);
                          }}
                          className="text-white bg-bgColor rounded-full my-0 mx-2 px-4  py-1 transition-all ease-in-out duration-150 cursor-pointer"
                        >
                          VERIFY
                        </span>
                        to be able to request documents{" "}
                      </p>
                    </div>
                    <div
                      className={`  items-center gap-1 text-sm w-full text-justify mb-4 ${
                        verifyClick ? "flex" : "hidden"
                      }`}
                    >
                      <p className="m-0 p-0 ">
                        please click
                        <span
                          onClick={() => {
                            location.reload();
                          }}
                          className=" bg-bgColor rounded-full my-0 mx-2 px-4  py-1 transition-all ease-in-out duration-150 cursor-pointer text-white"
                        >
                          CHECK VERIFICATION
                        </span>
                        to check your verification status{" "}
                      </p>
                    </div>
                  </>
                )}

                <button
                  onClick={() => {
                    route.push("/onlineservices");
                  }}
                  className=" text-white bg-bgColor rounded-full px-2 py-1 w-[200px] mx-auto"
                >
                  REQUEST
                </button>
                <button
                  onClick={() => {
                    route.push("/");
                    auth.signOut();
                  }}
                  className=" text-white bg-bgColor rounded-full px-2 py-1 w-[200px] mx-auto"
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
