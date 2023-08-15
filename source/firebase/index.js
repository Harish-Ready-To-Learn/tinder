// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore, serverTimestamp } from "firebase/firestore";

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
let app, auth;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("ERROR WHILE INITIALIZING FIREBASE");
  }
} else {
  app = getApp();
  auth = getAuth(app);
}

const provider = new EmailAuthProvider();
const db = getFirestore();
const timeStamp = serverTimestamp();

export { app, auth, provider, db, timeStamp };
