import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";

const User = ({ user }) => {
  const { darkMode } = useContext(ThemeContext);
  const [openMenu, setOpenMenu] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //DELETE USER
  const deleteUserMutation = useMutation(
    (id) => axios.delete(`http://localhost:3000/api/user/delete/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );
  const handleDeleteUser = () => {
    deleteUserMutation.mutate(user._id);
  };

  const handleView = () => {
    navigate(`/profile/${user.fullname}`, {state: {user}});
  }

  return (
    <tr
      className={`border-y ${
        darkMode ? "border-gray-800" : "border-gray-200"
      } `}
    >
      <td className="py-4 px-4 flex gap-3">
        <img src={user.image.url} alt="UserImage" className="w-[55px] h-[55px] rounded-full" />       
        <div className="flex items-center ">{user.fullname} </div> 
      </td>
      <td className="py-4 px-4">{user.role}</td>
      <td className="py-4 px-4">{user.email}</td>
      <td className="py-4 px-4">{user.phoneNumber}</td>
      <td className="py-4 px-4">
        {new Date(user.startDate).toLocaleDateString("en-US")}
      </td>
      <td className="py-4 pl-6">
        <PiDotsThreeOutlineVerticalFill
          className="cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        />
        {openMenu && (
          <div
            className={`absolute flex flex-col right-[120px] p-3 px-5 gap-1 rounded-md font-bold ${
              darkMode
                ? "bg-gray-800 opacity-80 "
                : "border border-gray-300 bg-gray-100 "
            }`}
          >
            <button
            onClick={handleView}
              className={`cursor-pointer ${
                darkMode
                  ? "hover:text-gray-50 "
                  : "text-gray-700 hover:text-gray-500"
              } `}
            >
              View
            </button>
            <button
              onClick={() => document.getElementById("editUser").showModal()}
              className={`cursor-pointer ${
                darkMode
                  ? "hover:text-gray-50 "
                  : "text-gray-700 hover:text-gray-500"
              } `}
            >
              Edit
            </button>
            <dialog
              className={`bg-card border border-border rounded-md text-foreground`}
              id="editUser"
            >
              <div className={`w-[500px] px-10 py-4 rounded-md `}>
                <EditUser user={user} />
              </div>
            </dialog>
            <button
              onClick={handleDeleteUser}
              className={`cursor-pointer ${
                darkMode
                  ? "hover:text-gray-50 "
                  : "text-gray-700 hover:text-gray-500"
              } `}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default User;
