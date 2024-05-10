import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import Loading from "../../loading/index";
import IconLogin from "../../../assets/ic_login.jpg";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setErrorMessage("Email dan kata sandi harus diisi");
      return;
    }
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/alkes"} replace={true} />}
      <div className="flex h-screen">
        <div className="flex items-center justify-around w-1/2">
          <div>
            <img src={IconLogin} alt="login" className="w-3/4 p-10" />
          </div>
        </div>
        <div className="flex items-center justify-start w-1/2 bg-white">
          <form onSubmit={onSubmit} className="w-1/2 p-10 bg-white">
            <h1 className="mb-4 text-4xl font-bold text-center text-gray-800">
              Masuk
            </h1>
            {errorMessage && (
              <div className="w-full p-2 mb-8 font-semibold text-center text-red-600 bg-red-300 rounded-md">
                <p>{errorMessage}</p>
              </div>
            )}
            <label
              htmlFor="email"
              className="mb-6 text-lg font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex items-center px-3 py-2 mb-4 border-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="w-full p-[4px] border-none outline-none"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <label
              htmlFor="password"
              className="mb-6 text-lg font-medium text-gray-700"
            >
              Kata sandi
            </label>
            <div className="flex items-center px-3 py-2 border-2 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="w-full p-[4px] border-none outline-none "
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              onClick={onSubmit}
              className="block w-full py-3 mt-6 mb-2 font-semibold text-white bg-indigo-600 rounded-2xl"
            >
              {isSigningIn ? <Loading size="sm" /> : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
