import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import bgryImg from '../public/imgs/brgyImg.jpg'
import Link from 'next/link';

export default function Home() {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 '>
      <Head>
        <title>
          Contact Us
        </title>
      </Head>
      <nav>
      <div className=' flex gap-3 md:gap-5  justify-center items-center h-20 mt-0 mb-0 mx-auto text-md md:text-lg font-extrabold drop-shadow-[0px_3px_6px_rgba(0,0,0,0.5)]'>
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            Home
          </div>
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

          
          <div className='cursor-pointer text-gray-300 hover:text-white'>
            About
          </div>
        </div>
      </nav>
    </div>
  )
}
