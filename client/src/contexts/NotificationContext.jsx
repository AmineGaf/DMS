import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../pages/Auth/contexts/AuthContext";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

  const [notifications, setNotifications] = useState({ data: [] });

  
  const { user } = useContext(AuthContext);


  const updateNotification = (data) => {
    axios
      .post("http://localhost:3000/api/notification/addNotification", data)
      .then((response) => {
        const savedNotification = response.data;
        setNotifications((prevNotifications) => ({
          ...prevNotifications,
          data: [...prevNotifications.data, savedNotification],
        }));
      })
      .catch((error) => {
        console.error("Error saving notification:", error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/notification/getAll?receiverId=${user?._id}`
      )
      .then((response) => {
        const data = response.data;
        setNotifications({ user: user, data: data });
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [user, notifications]);

  const contextValue = {
    user: notifications.user,
    notifications: notifications.data,
    updateNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
