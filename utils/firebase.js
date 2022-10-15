// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo3VmqGDYXzEcRcs8HUsdqdg1rqm4C9Xg",
  authDomain: "brgy-fort.firebaseapp.com",
  projectId: "brgy-fort",
  storageBucket: "brgy-fort.appspot.com",
  messagingSenderId: "794542922168",
  appId: "1:794542922168:web:b542b8b4eaf92ed1e7574d",
  measurementId: "G-V77WGG00CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();