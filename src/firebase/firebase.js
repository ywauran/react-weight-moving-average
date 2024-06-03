import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDLeYiUvS6npWNAIbHd5TjgdO4XWcD1HE",
  authDomain: "starter-react-firebase.firebaseapp.com",
  projectId: "starter-react-firebase",
  storageBucket: "starter-react-firebase.appspot.com",
  messagingSenderId: "760158541798",
  appId: "1:760158541798:web:d6807a1e33df4e50172827",
  measurementId: "G-HK3VQQZFEJ",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
