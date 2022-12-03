import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, dbF } from "../../utils/firebase";
import { ref, update, get, child } from "firebase/database";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";
import { motion as m } from "framer-motion";

import downloadjs from "downloadjs";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export default function bsnsCertFrom() {
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

    const userEmail = document.getElementById("email").value;
    const userAdd = document.getElementById("address").value;
    const userNum = document.getElementById("phoneTel").value;
    const ownerBs = document.getElementById("ownerbs").value;
    const typeBs = document.getElementById("typebs").value;
    const nameBs = document.getElementById("namebs").value;
    const decBs = document.getElementById("decbs").value;
    const officeBs = document.getElementById("officebs").value;
    const employBs = document.getElementById("employbs").value;

    const url = "../assets/BsCert.pdf";
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText(ownerBs, {
      x: 335,
      y: 473,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(userAdd, {
      x: 95,
      y: 450,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(typeBs, {
      x: 200,
      y: 433,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(nameBs, {
      x: 235,
      y: 414,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(month + " " + dd + ", " + yyyy, {
      x: 305,
      y: 395,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(day, {
      x: 162,
      y: 190,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(month + ", 2022", {
      x: 240,
      y: 190,
      size: 10,
      font: helveticaFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    toast.info("Please wait...", {
      autoClose: 1500,
    });

    const refF = collection(dbF, "bsnsCert");

    if (userPurpose == "" || userEmail == "") {
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

              get(child(ref(db), `users/${newEmail}/bsnsCert`))
                .then((snapshot) => {
                  if (snapshot.exists()) {
                    toast.error("Only one request is allowed!");
                  } else {
                    addDoc(refF, {
                      purpose: userPurpose,
                      bsnsCertReqDate: today,

                      email: userEmail,
                      address: userAdd,
                      phoneTel: userNum,

                      businessname: nameBs,
                      owner: ownerBs,
                      type: typeBs,
                      description: decBs,

                      employeesNum: employBs,
                      area: officeBs,
                    }).then(() => {
                      const templateParams = {
                        to_email: userEmail,
                        to_name: ownerBs,
                      };

                      console.log(user);

                      update(ref(db, "users/" + newEmail), {
                        bsnsCert: "requested",
                        bsnsCertReqDate: today,
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
                            document.getElementById("email").value = "";
                            document.getElementById("address").value = "";
                            document.getElementById("phoneTel").value = "";

                            document.getElementById("namebs").value = "";
                            document.getElementById("ownerbs").value = "";
                            document.getElementById("namebs").value = "";
                            document.getElementById("typebs").value = "";
                            document.getElementById("decbs").value = "";
                            document.getElementById("officebs").value = "";
                            document.getElementById("employbs").value = "";
                            toast.success(
                              "Your application has been submitted. Please check you email."
                            );
                            downloadjs(
                              pdfBytes,
                              nameBs + " Brgy Certificate",
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
            <label htmlFor="ownerbs">Name of Owner*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="ownerbs"
              placeholder="Name of Owner"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="typebs">Type Of Business*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="typebs"
              placeholder="eg. Retailer, Wholesaler, Manufacturer, etc."
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1 ">
            <label htmlFor="namebs">Business Name*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="namebs"
              placeholder="eg. Mang Inasal"
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1 ">
            <label htmlFor="decbs">Business Description*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="decbs"
              placeholder="(e.g. Pioneer of space exploration in the Philippines. Office hours is during weekdays, from 9am to 5pm, except holidays"
            />
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-5 sm:justify-start justify-center">
          <div className="flex flex-col w-[300px] gap-1">
            <label htmlFor="emplobs">Number of Employees*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="employbs"
              placeholder="eg. Retailer, Wholesaler, Manufacturer, etc."
            />
          </div>
          <div className="flex flex-col w-[300px] gap-1 ">
            <label htmlFor="officebs">Office Dimension*</label>
            <input
              className="rounded-lg px-2 py-1 text-bgColor placeholder:text-gray-400 "
              type="text"
              id="officebs"
              placeholder="eg. Mang Inasal"
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

        <div className="mx-auto flex gap-5 mt-10">
          <button
            onClick={apply}
            className="px-4 py-1 bg-accentColor rounded-lg"
            type="submit"
          >
            SUBMIT
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
