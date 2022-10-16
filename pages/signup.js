import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import cityGirl from '../public/imgs/undrawCityGirl.svg'
import {TiArrowBack} from 'react-icons/ti'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import {auth, db} from '../utils/firebase'
import {createUserWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify'
import {ref, set, onValue, update} from "firebase/database";
export default function Signup (){

    const [user, loading] = useAuthState(auth);
    const route = useRouter();

    if(user){
        route.push("/")

        
    }

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
                    <div className=" text-white text-center font-extrabold mb-5 text-[45px] drop-shadow-[0px_3px_2px_rgba(0,0,0,0.50)]">
                        Sign Up
                    </div>
                    <div className="flex items-center justify-between ">
                        <input id="nameInput" className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)] placeholder:text-gray-500 text-white" placeholder="Full Name" type="text"></input>
                    </div>
                    <div className="flex items-center justify-between ">
                        <input id="emailInput" className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)] placeholder:text-gray-500 text-white" placeholder="Email" type="email"></input>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <input id="phoneInput" className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)] placeholder:text-gray-500 text-white" placeholder="Phone Number"></input>
                    </div>
                    <div className="flex items-center justify-between">
                        <input id="addressInput" className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)] placeholder:text-gray-500 text-white" placeholder="Address"></input>
                    </div>
                    <br></br>
                    <div className="flex items-center justify-between">
                         <input id="passwordInput"  className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)] placeholder:text-gray-500 text-white" placeholder="Password" type="text"></input>
                    </div>
                    <div className="flex items-center justify-between">
                        <input id="passwordConfirmInput" className="px-3 py-1 rounded-lg w-full bg-bgColor focus:outline-dashed shadow-[0px_3px_6px_rgba(0,0,0,0.5)] placeholder:text-gray-500 text-white" placeholder="Confirm password "></input>
                    </div>
                    <br>
                    </br>
                    <button onClick={()=>{
                        var nameInput = document.getElementById("nameInput").value;
                        var email = document.getElementById("emailInput").value;
                        var addressInput = document.getElementById("addressInput").value;
                        var phoneInput = document.getElementById("phoneInput").value;
                        var password = document.getElementById("passwordInput").value;
                        var passwordCon = document.getElementById("passwordConfirmInput").value;

                        if(nameInput.includes("0") || nameInput.includes("1") || nameInput.includes("2") || nameInput.includes("3") || nameInput.includes("4") || nameInput.includes("5") || nameInput.includes("6") || nameInput.includes("7") || nameInput.includes("8") || nameInput.includes("9") || nameInput.includes("9")){
                            toast.error("I don't that's your name!")
                        }
                        else{
                            if(!email.includes("@") || !email.includes(".com") || !email.includes(".")){
                                toast.error("Email is invalid!")
                            }
                            else{
                                if(isNaN(phoneInput) || phoneInput.length!=11){
                                    toast.error("Phone number is invalid!")
                                }
                                else{
                                    if(password.match(passwordCon) && passwordCon.match(password)){

                                        createUserWithEmailAndPassword(auth, email, password)
                                        .then((userCredential) => {
                                        // Signed in 
                                            const user = userCredential.user;

                                            console.log(user)

                                            const newEmail = user.email.replace(".com","").replace("@","").replace("#","").replace("$","").replace("[","").replace("]","").replace(".","")
                                            
                                            set(ref(db, 'users/' + newEmail), {
                                                userName: nameInput,
                                                userEmail: email,
                                                userAddress : addressInput,
                                                userPhone: phoneInput,
                                                userStatus: user.emailVerified
                                            });

                                        // ...
                                        })
                                        .catch((error) => {
                                            toast.error(error.code);
                                        // ..
                                        });

                                        
                                    }
                                    else{
                                        toast.error("Password did match!")
                                    }
                                }

                            }
                        }
                        

                        

                    }} 
        className="bg-white rounded-lg text-bgColor font-extrabold text-2xl shadow-[0px_5px_10px_rgba(0,0,0,0.5)] py-2 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.8)] transition-all ease-in-out">
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