import brgyLogo from "../public/imgs/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Title() {
  const router = useRouter();

  return (
    <div
      className={`flex flex-row justify-start items-center w-full  h-[144px] px-[10px] mx-auto mt-20 mb-5 ${
        router.route == "/login" && " hidden"
      } ${router.route == "/signup" && " hidden"}`}
    >
      <div className=" relative flex items-center justify-center max-h-[75px] md:max-h-[100px] max-w-[75px] md:max-w-[100px]">
        <Image src={brgyLogo}></Image>
      </div>
      <div className="font-extrabold  p-3">
        <div className="text-xl md:text-3xl">
          {router.route == "/" && "HOME"}
          {router.route == "/about" && "ABOUT"}
          {router.route == "/contact" && "CONTACT"}
          {router.route == "/onlineservices" && "SERVICES"}
          {router.route == "/forms/barangaycertificate-form" && "REQUEST FORM"}
          {router.route == "/forms/brgyid-form" && "REQUEST FORM"}
          {router.route == "/forms/businesscertificate-form" && "REQUEST FORM"}
          {router.route == "/profile" && "PROFILE"}
        </div>
        <div className="text-md md:text-xl">BARANGAY FORT BONIFACIO</div>
        <div className="h-1 w-full bg-bgColor"></div>
        <div className="text-sm md:text-lg">
          {router.route == "/" && "WELCOME!"}
          {router.route == "/about" &&
            "Meet the dedicated team for a better Fort!"}

          {router.route == "/contact" &&
            "We are willing to assist you with your concerns."}

          {router.route == "/onlineservices" &&
            "Quality Online Services We Offered For You"}

          {router.route == "/forms/barangaycertificate-form" &&
            "Barangay Certificate Application Form"}

          {router.route == "/forms/businesscertificate-form" &&
            "Business Certificate Application Form"}

          {router.route == "/forms/brgyid-form" &&
            "Barangay ID Application Form"}

          {router.route == "/profile" &&
            "Barangay Certificate Application Form"}
        </div>
      </div>
    </div>
  );
}
