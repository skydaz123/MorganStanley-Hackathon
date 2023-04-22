// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import axios from "axios";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let app;
let analytics;

// axios.get('/firebase').then((res) => {
//   const firebaseConfig = res.data
//   app = initializeApp(firebaseConfig)
//   analytics = getAnalytics(app);
// })