import Head from "next/head";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, dbF } from "../../utils/firebase";
import { ref, update, get, child } from "firebase/database";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import brgyLogo from "../../public/imgs/logo.png";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import { motion as m } from "framer-motion";

import downloadjs from "downloadjs";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function brgyIDFrom() {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;

  var month, day;

  if (mm == 12) {
    month = "December";
  }
  if (mm == 11) {
    month = "November";
  }
  if (mm == 10) {
    month = "October";
  }
  if (mm == 9) {
    month = "September";
  }
  if (mm == 8) {
    month = "August";
  }
  if (mm == 7) {
    month = "July";
  }
  if (mm == 6) {
    month = "June";
  }
  if (mm == 5) {
    month = "May";
  }
  if (mm == 4) {
    month = "April";
  }
  if (mm == 3) {
    month = "March";
  }
  if (mm == 2) {
    month = "February";
  }
  if (mm == 1) {
    month = "January";
  }

  if (dd == 1) {
    day = "1st";
  }
  if (dd == 2) {
    day = "2nd";
  }
  if (dd == 3) {
    day = "3rd";
  }
  if (dd > 3 && dd < 21) {
    day = dd + "th";
  }
  if (dd == 21) {
    day = "21st";
  }
  if (dd == 22) {
    day = "22nd";
  }
  if (dd == 23) {
    day = "23rd";
  }
  if (dd > 23 && dd < 31) {
    day = dd + "th";
  }
  if (dd == 31) {
    day = "31st";
  }

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
  }

  const apply = async () => {
    const userPurpose = document.getElementById("purpose").value;

    const userFirst = document.getElementById("firstName").value;
    const userMiddle = document.getElementById("middleName").value;
    const userLast = document.getElementById("lastName").value;

    const userEmail = document.getElementById("email").value;
    const userAdd = document.getElementById("address").value;
    const userNum = document.getElementById("phoneTel").value;

    const userAge = document.getElementById("age").value;
    const userBday = document.getElementById("bday").value;
    const userPlace = document.getElementById("placeBday").value;
    const userGender = document.getElementById("gender").value;
    const userBlood = document.getElementById("blood").value;

    const userSSS = document.getElementById("sss").value;
    const userTIN = document.getElementById("tin").value;
    const userPH = document.getElementById("phHealth").value;

    const url = "../assets/ID.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText(userFirst + " " + userMiddle + " " + userLast, {
      x: 40,
      y: 111,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(userAdd, {
      x: 58,
      y: 102,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(userBday, {
      x: 58,
      y: 85,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(userPlace, {
      x: 58,
      y: 76,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(userNum, {
      x: 58,
      y: 67,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText("SSS: " + userSSS + " / " + "TIN: " + userTIN, {
      x: 58,
      y: 58,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(month + " " + day + ", " + yyyy, {
      x: 58,
      y: 49,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(month + " " + day + ", " + (yyyy + 3), {
      x: 58,
      y: 40,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText("123123123", {
      x: 58,
      y: 31,
      size: 5,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    toast.info("Please wait...", {
      autoClose: 1500,
    });

    const refF = collection(dbF, "brgyId");

    if (
      userPurpose == "" ||
      userFirst == "" ||
      userMiddle == "" ||
      userLast == "" ||
      userEmail == "" ||
      userAdd == "" ||
      userAge == "" ||
      userBday == ""
    ) {
      toast.error("Please check the fields");
    } else {
      const newEmail = user.email
        .replace(".com", "")
        .replace("@", "")
        .replace("#", "")
        .replace("$", "")
        .replace("[", "")
        .replace("]", "")
        .replace(".", "");
      await get(child(ref(db), `users/${newEmail}`))
        .then((snapshot) => {
          if (
            snapshot.val().userName != `${userFirst} ${userMiddle} ${userLast}`
          ) {
            toast.error(
              "Make sure your full name matches with your account name"
            );
          } else {
            if (!user.email.match(userEmail)) {
              toast.error("Your email does not match!");
            } else {
              if (!user.emailVerified) {
                toast.error("You are not verified!");
              } else {
                const newEmail = user.email
                  .replace(".com", "")
                  .replace("@", "")
                  .replace("#", "")
                  .replace("$", "")
                  .replace("[", "")
                  .replace("]", "")
                  .replace(".", "");

                get(child(ref(db), `users/${newEmail}/brgyId`))
                  .then((snapshot) => {
                    if (snapshot.exists()) {
                      toast.error("Only one request is allowed!");
                    } else {
                      addDoc(refF, {
                        purpose: userPurpose,
                        BrgyIdReqDate: today,

                        firstName: userFirst,
                        middleName: userMiddle,
                        lastName: userLast,

                        email: userEmail,
                        address: userAdd,
                        phoneTel: userNum,

                        age: userAge,
                        bday: userBday,
                        placeBday: userPlace,
                        gender: userGender,
                        blood: userBlood,

                        phHealth: userPH,
                        sss: userSSS,
                        tin: userTIN,

                        addressE: document.getElementById("addressE").value,
                        contactE: document.getElementById("contactE").value,
                      }).then(() => {
                        const templateParams = {
                          to_email: userEmail,
                          to_name: userFirst,
                        };

                        console.log(user);

                        update(ref(db, "users/" + newEmail), {
                          brgyId: "requested",
                          brgyIdReqDate: today,
                        });

                        emailjs
                          .send(
                            "service_bup01x9",
                            "template_tbb9llr",
                            templateParams,
                            "Hmo8d3cG1IBa4DXz0"
                          )
                          .then(
                            (response) => {
                              document.getElementById("purpose").value = "";
                              document.getElementById("firstName").value = "";
                              document.getElementById("middleName").value = "";
                              document.getElementById("lastName").value = "";
                              document.getElementById("email").value = "";
                              document.getElementById("address").value = "";
                              document.getElementById("phoneTel").value = "";
                              document.getElementById("age").value = "";
                              document.getElementById("bday").value = "";
                              document.getElementById("placeBday").value = "";
                              document.getElementById("gender").value = "";
                              document.getElementById("blood").value = "";
                              document.getElementById("phHealth").value = "";
                              document.getElementById("sss").value = "";
                              document.getElementById("tin").value = "";
                              document.getElementById("addressE").value = "";
                              document.getElementById("contactE").value = "";
                              toast.success(
                                "Your application for Brgy. ID has been submitted. Please check you email."
                              );

                              downloadjs(
                                pdfBytes,
                                userFirst + " Brgy Certificate",
                                "application/pdf"
                              );
                            },
                            (err) => {
                              toast.success(err);
                            }
                          );
                      });
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <m.div
      initial={{ y: "100%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      exit={{ opacity: 0 }}
      className="absolute top-56 left-0 h-[calc(1 00vh-240px)] w-full bg-white"
    >
      <Head>
        <title>Barangay Certificate Application Form</title>
        <link rel="shortcut icon" href="../logo.png" type="image/png" />
      </Head>

      <div className="bg-bgColor w-[full] h-fit px-20 py-10 flex flex-col gap-2 text-white sm:items-start items-center ">
        <div className="flex flex-col w-[300px] gap-1">
          <label htmlFor="purpose">Purpose of Request*</label>
          <input
            className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
            type="text"
            id="purpose"
            placeholder="Purpose of Request"
          />
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="firstName">First Name*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="firstName"
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1 ">
            <label htmlFor="middleName">Middle Name*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="middleName"
              placeholder="Middle Name"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="lastName">Last Name*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="lastName"
              placeholder="Last Name"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col  gap-1 w-[300px]">
            <label htmlFor="email">Email Address*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col  gap-1 w-[300px]">
            <label htmlFor="address">Address*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="address"
              placeholder="(House No., Street, Brgy., Municipality, Province)"
            />
          </div>
          <div className="flex flex-col  gap-1 w-[300px]">
            <label htmlFor="phoneTel">Phone/ Tel. #</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="phoneTel"
              placeholder="Phone/ Tel. #"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="age">Age*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="age"
              placeholder="Age"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="bday">Date of Birth*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="date"
              id="bday"
              placeholder="Date of Birth"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="placeBday">Place of Birth*</label>
            <input
              className="rounded-lg px-2 h-[32px] text-bgColor placeholder:text-gray-400 "
              type="text"
              id="placeBday"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="gender">Gender</label>

            <select
              className="rounded-lg px-2 h-[32px] text-bgColor placeholder:text-gray-400 "
              type="text"
              id="gender"
            >
              <option value="didNotSelect"></option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="preferredNotToSay">I prefer not to say</option>
            </select>
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="blood">Blood Type</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="blood"
              placeholder="Blood Type"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="phHealth">PhilHealth No.</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="phHealth"
              placeholder="PhilHealth No."
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="sss">SSS No.</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="sss"
              placeholder="SSS No."
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="tin">TIN No.</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="tin"
              placeholder="TIN No."
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="contactE">Name of Contact Person</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="contactE"
              placeholder="Contact Person in case of Emergency"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="addressE">Address of Contact Person</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="addressE"
              placeholder="Address of Contact Person"
            />
          </div>
        </div>

        <div className="mx-auto flex gap-5 mt-10">
          <button
            onClick={apply}
            className="px-4 py-1 bg-accentColor rounded-lg"
            type="submit"
          >
            SUBMIT & PRINT
          </button>
          <button
            onClick={() => {
              route.push("/onlineservices");
            }}
            className="px-4 py-1 bg-white text-black rounded-lg"
          >
            CANCEL
          </button>
        </div>
      </div>
    </m.div>
  );
}
