import React, { useState, useContext, useEffect } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { ThemeContext } from "../contexts/ThemeContext";
import { PiSignOutBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import {  useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/Auth/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setLoading(false);
  }, []);

  const { dispatch } = React.useContext(AuthContext);
  
  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/");
  };

  const handleNavigate = () => {
    navigate(`/profile/${user.fullname}`, {state: user.email});
   
  }

  const handleSettings = () => {
    navigate(`/settings/${user.fullname}`, {state: {user}});
  }

  if (loading) {
    return <div>Loading...</div>;
  }
   

  return (
    <div
      className={`md:flex bg-background text-foreground border border-border  justify-end px-4 p-3 duration-500 max-h-[70px] shadow-md border-b gap-4   `}
    >
      <div className="flex gap-4 items-center">
        <IoMdNotificationsOutline
          className={`text-xl h-7 w-7  cursor-pointer `}
        />
        <label className="swap swap-rotate">
          <input type="checkbox" onClick={toggleDarkMode} />

          <svg
            className="swap-on fill-current w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className="swap-off fill-current w-7 h-7"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>

      <div className=" ">
        {user && (
          <img
          src={user.image.url}
          className="rounded-full w-[46px] h-[46px]  cursor-pointer"
          onClick={() => setOpen(!open)}
        />
        )}
        

        {open && (
          <div
            className={`absolute flex flex-col gap-3 right-8 top-14 md:w-[210px] w-[180px] border-2 p-3 rounded-md bg-card z-20  `}
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
                <img src={user.image.url} alt="" className="md:h-14 h-10 rounded-md" />
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
