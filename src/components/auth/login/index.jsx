import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import Loading from "../../loading/index";

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
    <div>
      {userLoggedIn && <Navigate to={"/alkes"} replace={true} />}
      <main className="flex self-center w-full h-screen place-content-center place-items-center">
        <div className="p-4 space-y-5 text-gray-600 border shadow-xl w-96 rounded-xl">
          {errorMessage && (
            <div className="w-full p-2 font-semibold text-center text-red-600 bg-red-300 rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-gray-600">Email</label>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">
                Kata Sandi
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isSigningIn ? <Loading size="sm" /> : "Masuk"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
