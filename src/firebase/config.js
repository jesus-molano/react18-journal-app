import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: "AIzaSyDwYV32CIbFgIMH55iiAMiQT9O4xlXP83o",
  authDomain: "react18-udemy.firebaseapp.com",
  projectId: "react18-udemy",
  storageBucket: "react18-udemy.appspot.com",
  messagingSenderId: "546348031128",
  appId: "1:546348031128:web:bff0ea67912cebd4ef44ed"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)
export const firebaseDB = getFirestore(firebaseApp)