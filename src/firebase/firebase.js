import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD1dAhmFu4Sl0DF8503F1NCocejGdpfodg",
  authDomain: "medical-plant-89ef2.firebaseapp.com",
  projectId: "medical-plant-89ef2",
  storageBucket: "medical-plant-89ef2.appspot.com",
  messagingSenderId: "810817942686",
  appId: "1:810817942686:web:26620bbe6a5adf2369378f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
