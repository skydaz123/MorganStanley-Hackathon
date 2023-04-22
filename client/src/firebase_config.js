// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxdUYt0iCeAYT_iA2jldonPYZWsYdhT1w",
  authDomain: "codetogive5.firebaseapp.com",
  projectId: "codetogive5",
  storageBucket: "codetogive5.appspot.com",
  messagingSenderId: "559532548129",
  appId: "1:559532548129:web:0e39b1c16be463fce74360",
  measurementId: "G-P9H3JVBBTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);