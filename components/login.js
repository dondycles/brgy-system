import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import cityGirl from "../public/imgs/undrawCityGirl.svg";
import { TiArrowBack } from "react-icons/ti";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { motion as m } from "framer-motion";

export default function Login() {
  const route = useRouter();

  const [user, loading] = useAuthState(auth);

  if (user) {
    route.push("/");
  }

  return <></>;
}
