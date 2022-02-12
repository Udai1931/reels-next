// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1PoYsxwSBWfntk7fNwWe9LfqzAdHP6lk",
    authDomain: "reels-next.firebaseapp.com",
    projectId: "reels-next",
    storageBucket: "reels-next.appspot.com",
    messagingSenderId: "1030695103514",
    appId: "1:1030695103514:web:47185167afaad4c291f5a3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();
export default app;
export { db, storage, auth };