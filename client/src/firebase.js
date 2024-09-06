// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-pal-7b22d.firebaseapp.com",
  projectId: "real-pal-7b22d",
  storageBucket: "real-pal-7b22d.appspot.com",
  messagingSenderId: "224211449735",
  appId: "1:224211449735:web:7e04ac84a9e440838f4522",
  measurementId: "G-3QHBS0EMDD"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const analytics = getAnalytics(app);