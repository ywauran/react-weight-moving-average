import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    let errorMessage = "";
    console.log(error.code);
    switch (error.code) {
      case "auth/invalid-credential":
        errorMessage = "Email tidak valid. Coba lagi.";
        break;
      case "auth/user-not-found":
        errorMessage = "Pengguna tidak ditemukan. Cek kembali email Anda.";
        break;
      case "auth/wrong-password":
        errorMessage = "Kata sandi salah. Coba lagi.";
        break;
      case "auth/invalid-email":
        errorMessage = "Email tidak valid. Coba lagi.";
        break;
      default:
        errorMessage = "Gagal masuk. Silahkan coba lagi .";
        break;
    }
    throw new Error(errorMessage);
  });
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/dashboard`,
  });
};
