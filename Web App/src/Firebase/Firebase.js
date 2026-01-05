// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aichef-9981b.firebaseapp.com",
  projectId: "aichef-9981b",
  storageBucket: "aichef-9981b.firebasestorage.app",
  messagingSenderId: "890672915174",
  appId: "1:890672915174:web:2d49b1a2936d4e8f9d1127",
  measurementId: "G-WSZ8S31S17"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)


export {app, auth}
