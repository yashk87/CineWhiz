import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDBT0j-1SGtqYslZiJoeTx3j7uiXz4tkjo",
  authDomain: "phone-verify-db9ca.firebaseapp.com",
  projectId: "phone-verify-db9ca",
  storageBucket: "phone-verify-db9ca.appspot.com",
  messagingSenderId: "679353072842",
  appId: "1:679353072842:web:3ff31a21452f707f8c8833",
  measurementId: "G-C0BKZW387J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
