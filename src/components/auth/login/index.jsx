import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password);
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}

      <main className="flex self-center w-full h-screen place-content-center place-items-center">
        <div className="p-4 space-y-5 text-gray-600 border shadow-xl w-96 rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Welcome Back
              </h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold text-gray-600">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="text-sm font-bold text-gray-600">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            {errorMessage && (
              <span className="font-bold text-red-600">{errorMessage}</span>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
