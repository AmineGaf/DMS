import React, { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import NotificationDetails from "./NotificationDetails";
import { IoMdNotificationsOutline } from "react-icons/io";
import { ThemeContext } from "../contexts/ThemeContext";

const Notifications = () => {


  const { darkMode } = useContext(ThemeContext);

  const { notifications } = useContext(NotificationContext);

  const reversedNotifications = [...notifications].reverse();

  const hasNotifications = reversedNotifications.length > 0;

  return (
    <div className="dropdown dropdown-bottom dropdown-end" tabIndex={0}>
      <div className="flex items-center">
        <IoMdNotificationsOutline
          className={`text-xl h-7 w-7 cursor-pointer ${
            hasNotifications ? "text-primary" : ""
          }`}
        />
        {hasNotifications && (
          <div className="rounded-full h-2 w-2 bg-primary absolute bottom-5"></div>
        )}
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content z-[1] menu p-4 shadow  rounded-box w-64 ml-4 mt-1 ${darkMode ? "bg-primary-foreground border border-border" : "bg-primary-foreground border border-gray-400"}`}
      >
        {hasNotifications > 0 ? (
          reversedNotifications.map((notification) => (
            <div key={notification._id}>
              <NotificationDetails
                notification={notification}
                key={notification._id}
              />
            </div>
          ))
        ) : (
          <li>
            <a>No notifications</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Notifications;