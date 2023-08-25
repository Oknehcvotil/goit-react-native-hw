import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCDpIg9HC8Qc7H6A0jLN60u1e1K5PZ5Svk",
  authDomain: "goit-app-4f14a.firebaseapp.com",
  databaseURL:
    "https://goit-app-4f14a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "goit-app-4f14a",
  storageBucket: "goit-app-4f14a.appspot.com",
  messagingSenderId: "450756253843",
  appId: "1:450756253843:web:204da54d3e77dcc47d5566",
  measurementId: "G-LP1FR7899B",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
