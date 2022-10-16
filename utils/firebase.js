// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth"
import {getDatabase} from 'firebase/database'
const firebaseConfig = {
  apiKey: "AIzaSyDo3VmqGDYXzEcRcs8HUsdqdg1rqm4C9Xg",
  authDomain: "brgy-fort.firebaseapp.com",
  databaseURL: "https://brgy-fort-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "brgy-fort",
  storageBucket: "brgy-fort.appspot.com",
  messagingSenderId: "794542922168",
  appId: "1:794542922168:web:b542b8b4eaf92ed1e7574d",
  measurementId: "G-V77WGG00CB"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getDatabase();