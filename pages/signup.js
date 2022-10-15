import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import cityGirl from '../public/imgs/undrawCityGirl.svg'
import {TiArrowBack} from 'react-icons/ti'

export default function Signup (){

    return(

        <div className="className='fixed top-0 bottom-0 left-0 right-0 h-screen w-screen flex justify-center items-center">
            <Head>
                <title>
                    Sign Up
                </title>
            </Head>
            <div className="m-auto h-fit w-fit p-5 bg-accentColor rounded-lg shadow-customShadow flex flex-row gap-10 relative scale-[0.75] md:scale-[1]">
                <Link href="/" passHref className='w-0' >
                    <a className=' z-10 absolute top-0 left-0 text-2xl'>
                        <div className=' absolute top-5 left-5 text-2xl cursor-pointer hover:scale-[1.5] transition-all ease-in-out drop-shadow-[0px_3px_2px_rgba(0,0,0,0.50)]'>
                            <TiArrowBack />
                        </div>
                    </a>
                </Link>

                <div className=' m-auto relative w-[300px] h-[300px] overflow-hidden md:flex hidden'>
                    
                    <Image src={cityGirl}
                    objectPosition='center'
                    layout='fill'/>
                </div>

                <div className="w-[350px] flex flex-col gap-2 justify-center" >
                    <div className="text-center font-extrabold mb-5 text-[45px] drop-shadow-[0px_3px_2px_rgba(0,0,0,0.50)]">
                        Sign Up
                    </div>
                    <div className="flex items-center justify-between ">
                        <input className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)]" placeholder="Email"></input>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <input className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)]" placeholder="Phone Number"></input>
                    </div>
                    <div className="flex items-center justify-between">
                        <input className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)]" placeholder="Address"></input>
                    </div>
                    <br></br>
                    <div className="flex items-center justify-between">
                         <input className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)]" placeholder="Password"></input>
                    </div>
                    <div className="flex items-center justify-between">
                        <input className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)]" placeholder="Confirm password "></input>
                    </div>
                    <br>
                    </br>
                    <button className="bg-white rounded-lg text-bgColor font-extrabold text-2xl shadow-[0px_5px_10px_rgba(0,0,0,0.5)] py-2 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.8)] transition-all ease-in-out">
                        Register
                    </button>
                    <div className=' m-auto flex gap-2 mt-0 mb-0'>
                        <span className='opacity-[80%] '>
                            or
                        </span>
                        <Link href="/login" passHref>
                            <a>
                                <span className='opacity-[80%] hover:opacity-[100%] font-extrabold cursor-pointer transition-all ease-in-out'>
                                    Log In
                                </span>
                            </a>
                        </Link>
                       
                    </div>
                </div>
                
            </div>


        </div>

    )
}