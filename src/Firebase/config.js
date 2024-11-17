// src/Firebase/config.js
import { initializeApp } from 'firebase/app'; // Correct import for Firebase v9+
import { getFirestore } from 'firebase/firestore'; // Correct import for Firestore

const firebaseConfig = {
  apiKey: "AIzaSyC8lvxmpDp2p4QweySyJ-7_Yk_Cy5CX95A",
  authDomain: "to-do-app-mehaksingh.firebaseapp.com",
  projectId: "to-do-app-mehaksingh",
  storageBucket: "to-do-app-mehaksingh.appspot.com",
  messagingSenderId: "780049100598",
  appId: "1:780049100598:web:881f5a7b25678071ae0d97",
  measurementId: "G-8LMWHCZ8LF",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp); // Initialize Firestore

export { db }; // Export Firestore instance


