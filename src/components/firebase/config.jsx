// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnFeUiAmtHdD37pLRRGgvpoY9vDkxp2Yo",
  authDomain: "pizza-flash-9e07b.firebaseapp.com",
  projectId: "pizza-flash-9e07b",
  storageBucket: "pizza-flash-9e07b.firebasestorage.app",
  messagingSenderId: "743797359507",
  appId: "1:743797359507:web:24e72d7992e5f1a0499e66",
  measurementId: "G-GS9MBG81JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);