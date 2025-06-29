// ------------------------------------------------------------------
// FILE: src/lib/firebase.js
// DESC: Centralized Firebase configuration and initialization.
// ------------------------------------------------------------------
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config)
  : {
    apiKey: "AIzaSyDbGgknLfdlndczTdK87uH7UwHhtp4sjnM",
    authDomain: "rooftoplease-517c6.firebaseapp.com",
    projectId: "rooftoplease-517c6",
    storageBucket: "rooftoplease-517c6.firebasestorage.app",
    messagingSenderId: "311139534277",
    appId: "1:311139534277:web:8d42565abea8272774f7ac",
    measurementId: "G-QMWW2Z95WN"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };