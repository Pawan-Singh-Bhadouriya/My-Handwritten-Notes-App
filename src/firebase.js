// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNlMywPj43iCyC8Y4QYmqy_wJlXInjsbM",
  authDomain: "handwritten-notes-website.firebaseapp.com",
  projectId: "handwritten-notes-website",
  storageBucket: "handwritten-notes-website.firebasestorage.app",
  messagingSenderId: "1030025083841",
  appId: "1:1030025083841:web:35570145cf2f30ff444d40",
  measurementId: "G-TTMZZP6RL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 