import { NavLink } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

const navData = [
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
      <div className="fixed top-0 left-0 z-50 w-64 h-screen p-4 transition-transform bg-white sidebar-menu">
        <div className="flex flex-col justify-center h-full ">
          <ul>
            {navData.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  activeClassName="active"
                  className="flex items-center px-4 py-2 font-medium text-gray-700 rounded-md hover:bg-gray-300 hover:text-white"
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
            className="flex items-center px-4 py-2 font-medium text-gray-700 rounded-md hover:bg-gray-300 hover:text-white"
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
