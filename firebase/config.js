// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOOn-Kdsrf0xZzx7LbKMwlNoH7TjF9B9Q",
    authDomain: "warriors-exports.firebaseapp.com",
    projectId: "warriors-exports",
    storageBucket: "warriors-exports.firebasestorage.app",
    messagingSenderId: "133488068343",
    appId: "1:133488068343:web:e75c1392811842e2eff5f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {app, auth, firestore}