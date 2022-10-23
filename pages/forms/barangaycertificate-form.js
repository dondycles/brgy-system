import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, dbF } from "../../utils/firebase";
import { ref, set, onValue, update, get, child } from "firebase/database";
import { GoUnverified, GoVerified } from "react-icons/go";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import brgyLogo from "../../public/imgs/logo.png";
import bgryImg from "../../public/imgs/brgyImg.jpg";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";

export default function brgyCertFrom() {
  const [user, loading] = useAuthState(auth);
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

    const refF = collection(dbF, "brgyCert");

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

        await get(child(ref(db), `users/${newEmail}/brgyClr`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              toast.error("Only one request is allowed!");
            } else {
              addDoc(refF, {
                purpose: userPurpose,

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

                phHealth: document.getElementById("phHealth").value,
                sss: document.getElementById("sss").value,
                tin: document.getElementById("tin").value,

                addressE: document.getElementById("addressE").value,
                contactE: document.getElementById("contactE").value,
              }).then(() => {
                const templateParams = {
                  to_email: userEmail,
                  to_name: userFirst,
                };

                console.log(user);

                update(ref(db, "users/" + newEmail), {
                  brgyClr: "requested",
                });
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

                emailjs
                  .send(
                    "service_bup01x9",
                    "template_tbb9llr",
                    templateParams,
                    "Hmo8d3cG1IBa4DXz0"
                  )
                  .then(
                    (response) => {
                      toast.success(
                        "Your application has been submitted. Please check you email."
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
  };

  return (
    <div className="mt-32 relative h-screen w-full text-white">
      <Head>
        <title>Barangay Certificate Application Form</title>
        <link rel="shortcut icon" href="../logo.png" type="image/png" />
      </Head>
      <div className="fixed top-0 left-0 right-0 z-10">
        <div className="bg-accentColor text-white font-extrabold p-[10px] flex flex-row justify-between">
          <div>Barangay Certificate Application Form</div>
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
      <div className=" relative mx-auto flex items-center justify-cente h-[90px] md:h-[130px] w-[90px] md:w-[130px]">
        <Image src={brgyLogo}></Image>
      </div>
      <div className="text-center font-extrabold text-3xl pt-3 text-bgColor">
        BRGY. FORT BONIFACIO
      </div>

      <div className="bg-bgColor w-[full] h-fit p-20 mt-10 flex flex-col gap-10 sm:items-start items-center ">
        <div className="text-center font-extrabold text-2xl text-white w-full">
          Barangay Certificate Application Form
        </div>

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
    </div>
  );
}
