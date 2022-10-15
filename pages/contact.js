import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import bgryImg from "../public/imgs/brgyImg.jpg";
import Link from "next/link";
import {HiMenu, HiOutlineX} from "react-icons/hi"

export default function Home() {

    if (typeof window !== 'undefined') {
        console.log('You are on the browser')
        const navMenu = document.getElementById('navMenu');
        navMenu.style.transform = "translateX(-100%)"
    
        const navMenuToggle = document.getElementById('navMenuToggle');
        navMenuToggle.addEventListener('click', function(){
            navMenu.style.transform = "translateX(0%)"
        })
        
        const navMenuToggleExit = document.getElementById('navMenuToggleExit');
        navMenuToggleExit.addEventListener('click', function(){
            navMenu.style.transform = "translateX(-100%)"
        })
    }      
    

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 ">
      <Head>
        <title>Contact Us</title>
      </Head>
      <nav className="w-screen mt-0">
        <div className=" bg-accentColor hidden sm:flex gap-3 md:gap-5 justify-center items-center h-20 mt-0 mb-0 mx-auto text-md md:text-lg font-extrabold drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]">
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
              <div className="cursor-pointer text-gray-300 hover:text-white bg-bgColor rounded-lg px-3 leading-10">
                Contact Us
              </div>
            </a>
          </Link>

          <Link href="/about" passHref>
            <a>
              <div className="cursor-pointer text-gray-300 hover:text-white hover:bg-bgColor rounded-lg px-3 leading-10">
                About
              </div>
            </a>
          </Link>
        </div>
        <div className=" px-5 sm:hidden flex justify-between items-center h-20 bg-accentColor" >
            <div id="navMenuToggle"  className=" text-[40px]">
                <HiMenu/>
            </div>
            <div className="rounded-full outline-2 outline outline-white bg-accentColor h-10 w-10">
            </div>
        </div>
      </nav>

      <div id="navMenu" className=" transition-all ease-in-out duration-300 flex  flex-col justify-center gap-10 font-extrabold text-[35px] bg-accentColor fixed top-0 bottom-0 left-0 h-screen w-fit px-5">

        <div id="navMenuToggleExit" className="absolute top-5 left-5 text-[40px]">
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
