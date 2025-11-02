/** @format */

// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOSV5FbbxXFqWIizxyFcg7akSzMUUhEtk",
  authDomain: "pfm-devonoon-b28fe.firebaseapp.com",
  projectId: "pfm-devonoon-b28fe",
  storageBucket: "pfm-devonoon-b28fe.firebasestorage.app",
  messagingSenderId: "343780755239",
  appId: "1:343780755239:web:bd018d7fc271baf8ec8b02",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;