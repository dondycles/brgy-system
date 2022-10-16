import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import bgryImg from "../public/imgs/brgyImg.jpg";
import Link from "next/link";
import {HiMenu, HiOutlineX} from "react-icons/hi"
import { useState } from "react";
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth, db} from '../utils/firebase'
import {ref, set, onValue, update, get, child} from "firebase/database";

export default function Home() {

    const [user, loading] = useAuthState(auth);
    const [toggleNav, setToggleNav] = useState(false)

    if(user){
      const newEmail = user.email.replace(".com","").replace("@","").replace("#","").replace("$","").replace("[","").replace("]","").replace(".","")
  
        get(child(ref(db), `users/${newEmail}` )).then((snapshot) => {
  
          if (snapshot.exists()) {
            console.log(snapshot.val().nameInput);
            const userNameDisplay = snapshot.val().nameInput;
            document.getElementById("userNameDisplay").innerHTML = userNameDisplay
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
    }
    
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 ">
          <Head>
            <title>Contact Us</title>
          </Head>
          <nav className="w-screen mt-0 ">
            <div className=" relative hidden sm:flex flex-row bg-accentColor items-center h-20 mt-0 mb-0 mx-auto drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]">
              <div className=" mx-auto  flex gap-3 md:gap-5 justify-center items-center  text-md md:text-lg font-extrabold drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]">
                <Link href="/" passHref>
                  <a>
                    <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                      Home
                    </div>
                  </a>
                </Link>
                <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                  Online Services
                </div>
      
                <Link href="/contact" passHref>
                  <a>
                    <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                      Contact Us
                    </div>
                  </a>
                </Link>
      
                <Link href="/about" passHref>
                  <a>
                    <div className="cursor-pointer text-gray-300 hover:text-white bg-bgColor rounded-lg px-3 leading-10">
                      About
                    </div>
                  </a>
                </Link>
              </div>
            {user && (
              <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-3  h-full w-[50px]  flex items-center drop-shadow-[0px_3px_3px_rgba(0,0,0,0.5)] text-right flex-row-reverse">
                <div id="userNameDisplay"></div>
              </div>
            )}
            </div>
            <div className=" relative px-5 sm:hidden flex justify-between items-center h-20 bg-accentColor" >
                <div onClick={()=>setToggleNav(!toggleNav)}  className=" text-[40px]">
                    <HiMenu/>
                </div>
                {user && (
                <div className="cursor-pointer absolute top-[50%] translate-y-[-50%] right-3  h-full w-[50px]  flex items-center drop-shadow-[0px_3px_3px_rgba(0,0,0,0.5)] text-right flex-row-reverse">
                    <div id="userNameDisplay">
                    </div>
                </div>
                )}
            </div>
          </nav>
    
        <div id="navMenu" className={
          toggleNav? "translate-x-[0%] transition-all ease-in-out duration-300 flex  flex-col justify-center gap-10 font-extrabold text-[35px] bg-accentColor fixed top-0 bottom-0 left-0 h-screen w-fit px-5 ${ }" 
          : " translate-x-[-100%] transition-all ease-in-out duration-300 flex  flex-col justify-center gap-10 font-extrabold text-[35px] bg-accentColor fixed top-0 bottom-0 left-0 h-screen w-fit px-5 ${ }" 
          }>
    
            <div onClick={()=>setToggleNav(!toggleNav)} className="absolute top-5 left-5 text-[40px]">
                <HiOutlineX/>    
            </div>
    
    
            <Link href="/" passHref>
                <a>
                    <div>
                        Home
                    </div>
                </a>
            </Link>
            <Link href="/" passHref>
                <a>
                    <div>
                        Online Services
                    </div>
                </a>
            </Link>
            <Link href="/" passHref>
                <a>
                    <div>
                        Contact Us
                    </div>
                </a>
            </Link>
            <Link href="/" passHref>
                <a>
                    <div>
                        About
                    </div>
                </a>
            </Link>
          </div>
        </div>
      );
}
