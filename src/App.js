import Login from "./components/auth/login";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import NotFound from "./pages/404";
import Alkes from "./pages/alkes";
import DetailAlkes from "./pages/alkes/detail-alkes";
import CalculateAlkes from "./pages/alkes/calculate-alkes";

function App() {
  const routesArray = [
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/alkes",
      element: <Alkes />,
    },
    {
      path: "/alkes/:id",
      element: <DetailAlkes />,
    },
    {
      path: "/alkes/calculate/:id",
      element: <CalculateAlkes />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="flex flex-col w-full h-screen">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
