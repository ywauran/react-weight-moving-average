import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Layout = ({ children }) => {
  const { userLoggedIn } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    // Redirect the user to the login page if not logged in
    if (!userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  if (!userLoggedIn) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      <main className="w-full p-10 md:w-[calc(100%-256px)] md:ml-64 bg-gray-50 min-h-screen transition-all">
        {children}
      </main>
    </>
  );
};

export default Layout;
