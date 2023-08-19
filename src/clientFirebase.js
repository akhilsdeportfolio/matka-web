// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getMessaging} from 'firebase/messaging'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfjZq0MoUwj4__tZq8uITZ3WTOS6dx8fo",
  authDomain: "matka-jatka-fb.firebaseapp.com",
  projectId: "matka-jatka-fb",
  storageBucket: "matka-jatka-fb.appspot.com",
  messagingSenderId: "740359768202",
  appId: "1:740359768202:web:989c7ebf11c012a896c573",
  measurementId: "G-23DQ1LEGSH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
