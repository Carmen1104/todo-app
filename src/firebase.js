// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtpeMldjLV7GuQe0mNrJQkwHzNhlKR04A",
  authDomain: "todo-app-128c2.firebaseapp.com",
  projectId: "todo-app-128c2",
  storageBucket: "todo-app-128c2.appspot.com",
  messagingSenderId: "944722904145",
  appId: "1:944722904145:web:9b5d08a78e82809e232470"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db}
export {auth}