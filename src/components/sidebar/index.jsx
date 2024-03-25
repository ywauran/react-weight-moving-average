import { NavLink } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

// Define your navigation data
const navData = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: "ri-home-line",
  },
  {
    path: "/alkes",
    label: "Data Alkes",
    icon: "ri-home-line",
  },
];

const Sidebar = () => {
  let navigate = useNavigate();
  return (
    <>
      {/* start: Sidebar */}
      <div className="fixed top-0 left-0 z-50 w-64 h-full p-4 transition-transform bg-gray-900 sidebar-menu">
        <a
          href="#"
          className="flex items-center pb-4 border-b border-b-gray-800"
        >
          <img
            src="https://placehold.co/32x32"
            alt=""
            className="object-cover w-8 h-8 rounded"
          />
          <span className="ml-3 text-lg font-bold text-white">Logo</span>
        </a>
        <div className="flex flex-col justify-between">
          <ul>
            {navData.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  activeClassName="active"
                  className="flex items-center px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                >
                  {/* <i className={item.icon}></i>{" "} */}
                  {/* Assuming you're using some icon library */}
                  <span>{item.label}</span>
                </NavLink>
                {/* If you have nested routes, you can render them here */}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/");
              });
            }}
            className="flex items-center w-full px-4 py-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
          >
            Keluar
          </button>
        </div>
      </div>
      <div className="fixed top-0 left-0 z-40 w-full h-full bg-black/50 md:hidden sidebar-overlay" />
    </>
  );
};

export default Sidebar;
