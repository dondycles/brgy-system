import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bgryImg from '../public/imgs/brgyImg.jpg'
import Link from 'next/link';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../utils/firebase'

export default function Home() {

  const [user, loading] = useAuthState(auth);

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 '>
      <Head>
        <title>
          Brgy. Fort
        </title>
        <meta name="description" content="Welcome to Brgy. Fort!"></meta>
      </Head>

      <div className='relative w-screen h-[60%] overflow-hidden shadow-customShadow'>
        <Image className='w-screen h-auto object-center '  objectFit='cover' layout='fill' width={1980} height={1080} src={bgryImg} />
      </div>
      <div className='w-full h-[40%] flex flex-col'>
        <div className=' flex gap-3 md:gap-5  justify-center items-center h-[50px] mt-0 mb-0 mx-auto text-md md:text-lg font-extrabold drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]'>
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            Online Services
          </div>

          <Link href="/contact" passHref>
            <a>
              <div className='cursor-pointer text-gray-300 hover:text-white'>
                Contact Us
              </div>
            </a>
          </Link>

          
          <Link href="/about" passHref>
            <a>
              <div className='cursor-pointer text-gray-300 hover:text-white'>
                About
              </div>
            </a>
          </Link>
        </div>

        {!user &&(


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
        )}

        {user && (
          <>
          <div className='flex gap-5 flex-col m-auto'>
            <div className='m-auto text-center flex flex-col gap-1 drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]'>
              <img className='m-auto rounded-full' src={user.photoURL} width={100} height={100} />
              <span>
                {user.displayName}
              </span>
            </div>
            <div>
              <button onClick={()=> auth.signOut()} className='mx-auto my-auto flex items-center justify-center gap-3 bg-accentColor rounded-full px-5 py-1 cursor-pointer origin-center font-medium hover:font-extrabold hover:px-[22px] transition-all ease-in-out text-gray-300 hover:text-white w-fit drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]'>
                Sign Out
              </button>
            </div>
          </div>
          </>
        )}


        <div className='mb-0 mt-auto mx-auto font-thin opacity-[50%] text-[10px]'>
          All Rights Reserved 2023
        </div>

      </div>
    </div>
  )
}
