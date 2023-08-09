// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnz0GaH9YLu6-Zeq7hDkicaeCms1pbU5Y",
  authDomain: "tinder-4a6d4.firebaseapp.com",
  projectId: "tinder-4a6d4",
  storageBucket: "tinder-4a6d4.appspot.com",
  messagingSenderId: "68145175297",
  appId: "1:68145175297:web:626b9438201f20d2201900",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new EmailAuthProvider();

export { app, auth, provider };
