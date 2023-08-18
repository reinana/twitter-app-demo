// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS60QhF-Gh1YfY5y8JH0-9iAulnlRkUAw",
  authDomain: "fir-twitter-746bd.firebaseapp.com",
  projectId: "fir-twitter-746bd",
  storageBucket: "fir-twitter-746bd.appspot.com",
  messagingSenderId: "692068082146",
  appId: "1:692068082146:web:db5634a14dd3431ef599bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { db, storage, auth, provider}