import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/Auth/contexts/AuthContext";

const UserMenu = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);


  const navigate = useNavigate();


  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/");
  };

  const handleNavigate = () => {
    navigate(`/profile/${user.fullname}`, { state: user.email });
  };

  const handleSettings = () => {
    navigate(`/settings/${user.fullname}`, { state: { user } });
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end" tabIndex={0}>
      <div className="flex items-center">
        <img
          src={user.image.url}
          className="rounded-full w-[46px] h-[46px]  cursor-pointer "
        />
      </div>
      <div
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-4 shadow  rounded-box w-64 mt-1 mr-3 ${
          darkMode
            ? "bg-primary-foreground border border-border"
            : "bg-primary-foreground border border-gray-400"
        }`}
      >
        <div className="flex justify-between">
          <div>
            <div
              className={`${
                darkMode ? "text-gray-200" : "text-gray-600"
              } font-bold text-lg `}
            >
              {user.fullname}
            </div>
            <div className=" text-gray-400">{user.role}</div>
          </div>
          <div>
            <img
              src={user.image.url}
              alt=""
              className="md:h-14 h-10 rounded-md"
            />
          </div>
        </div>
        <div
          className={`flex flex-col gap-2 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <div
            onClick={handleNavigate}
            className={`flex gap-2  cursor-pointer duration-150  ${
              darkMode ? "hover:text-sky-600" : "hover:text-blue-400"
            }`}
          >
            <CgProfile className="text-xl mt-[2px] " /> My Profile
          </div>
          <div
            onClick={handleSettings}
            className={`flex gap-2  cursor-pointer duration-150 ${
              darkMode ? "hover:text-sky-600" : "hover:text-blue-400"
            }`}
          >
            <IoSettingsOutline className="text-xl mt-[2px] " />
            Settings
          </div>
          <div
            className={`flex gap-2  cursor-pointer duration-150 ${
              darkMode ? "hover:text-sky-600" : "hover:text-blue-400"
            }`}
            onClick={handleLogout}
          >
            <PiSignOutBold className="text-xl mt-[2px] " />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
