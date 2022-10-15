import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bgryImg from '../public/imgs/brgyImg.jpg'
import Link from 'next/link';

export default function Home() {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 '>
      <div className='relative w-screen h-4/6 overflow-hidden shadow-customShadow'>
        <Image className='w-screen h-auto object-center '  objectFit='cover' layout='fill' width={1980} height={1080} src={bgryImg} />
      </div>
      <div className='w-full h-2/6 flex flex-col'>
        <div className=' flex gap-3 md:gap-5  justify-center items-center h-20 mt-0 mb-0 mx-auto text-md md:text-lg font-extrabold drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]'>
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            Home
          </div>
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            Online Services
          </div>
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            Contact Us
          </div>
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            About
          </div>
        </div>

        <div className='my-auto mx-auto w-full drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]'>

        <Link href="/signup" passHref>
          <a>
            <div className='mx-auto my-auto flex items-center justify-center gap-3 bg-accentColor rounded-full px-5 py-1 cursor-pointer origin-center font-medium hover:font-extrabold hover:px-[22px] transition-all ease-in-out text-gray-300 hover:text-white w-fit '>
                Sign In
            </div>
          </a>
        </Link>

          <div className='mx-auto my-auto flex items-center justify-center gap-3 rounded-full px-5 py-1 font-thin transition-all ease-in-out text-gray-300 w-fit'>
            or
            <Link href="/login" >
              <a>
                <span className='text-accentColor cursor-pointer font-medium hover:font-extrabold transition-all ease-in-out'>Log In</span>
              </a>
            </Link>
          </div>
        </div>

        <div className='mb-0 mx-auto font-thin opacity-[50%] text-[10px]'>
          All Rights Reserved 2023
        </div>

      </div>
    </div>
  )
}
