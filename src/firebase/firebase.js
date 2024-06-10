import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXjtq8JI60Mx35ie-lCtV-7l9_1riU1JY",
  authDomain: "react-wma.firebaseapp.com",
  projectId: "react-wma",
  storageBucket: "react-wma.appspot.com",
  messagingSenderId: "669340487735",
  appId: "1:669340487735:web:60ae29204fc64fb1e2afb2",
  measurementId: "G-VY0Y5MZ4LL",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
