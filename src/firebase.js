import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTUnixe-nQXlcUL-S8rkX07LicdS2THUg",
  authDomain: "instagram-clone-48e02.firebaseapp.com",
  projectId: "instagram-clone-48e02",
  storageBucket: "instagram-clone-48e02.appspot.com",
  messagingSenderId: "411713137809",
  appId: "1:411713137809:web:050db88c4151c9b07be330",
  measurementId: "G-2JR6YP85M0",
};

// Initialize Firebase
const app=initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const storage = getStorage(app)
export const auth = getAuth(); 



/* 
import firebase from "firebase/app";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBTUnixe-nQXlcUL-S8rkX07LicdS2THUg",
  authDomain: "instagram-clone-48e02.firebaseapp.com",
  projectId: "instagram-clone-48e02",
  storageBucket: "instagram-clone-48e02.appspot.com",
  messagingSenderId: "411713137809",
  appId: "1:411713137809:web:050db88c4151c9b07be330",
  measurementId: "G-2JR6YP85M0"
});

// Initialize Firebase

const db= firebaseApp.firestore()
const auth = firebase.auth()
const storage= firebase.storage()

export {db, auth, storage}; */
