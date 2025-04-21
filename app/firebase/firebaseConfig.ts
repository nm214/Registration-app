import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD-tkmoNnO1_mQL67aZAhN7NlG35jtut3M",
    authDomain: "registration-form-67b6c.firebaseapp.com",
    projectId: "registration-form-67b6c",
    storageBucket: "registration-form-67b6c.firebasestorage.app",
    messagingSenderId: "400795703954",
    appId: "1:400795703954:web:0b0a96d118e1646726644b",
    measurementId: "G-Z2836J08KP"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
