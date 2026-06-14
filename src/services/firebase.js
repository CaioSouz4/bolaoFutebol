// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB75BflP7cmi64ZT1DiLJN43wM-CXRpsZ4",
  authDomain: "bolaocopa-ca69a.firebaseapp.com",
  projectId: "bolaocopa-ca69a",
  storageBucket: "bolaocopa-ca69a.firebasestorage.app",
  messagingSenderId: "918433239012",
  appId: "1:918433239012:web:dd35a9307abc547f63c1f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);