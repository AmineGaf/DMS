import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import EditTask from "./EditTask";

const Task = ({ task }) => {
  const { darkMode } = useContext(ThemeContext);
  const [openMenu, setOpenMenu] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //DELETE TASK
  const deleteUserMutation = useMutation(
    (id) => axios.delete(`http://localhost:3000/api/task/deletetask/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );
  const handleDeleteUser = () => {
    deleteUserMutation.mutate(task._id);
  };

  const handleViewTask = (task) => {
    navigate(`/taskDetails/${task._id}`, {state: {task}});
  }

  return (
    <tr
      className={`border-y ${
        darkMode ? "border-gray-800" : "border-gray-200"
      } `}
    >
      <td className="py-4 px-4 ">{task.TaskName}</td>
      <td className="py-4 px-4">{task.ProjectName}</td>
      <td className="py-4 px-4">{task.ResponsibleUser}</td>
      <td 
      className={`flex justify-center ml-3 bg-gradient-to-r from-blue-700 to-cyan-400 text-blue-100 font-bold mt-4 py-1 max-w-[150px] rounded-md
      ${darkMode ? "" : "opacity-60"}`} 
      >{task.Status}</td>
      <td className="py-4 px-4">
        {new Date(task.DueDate).toLocaleDateString("en-US")}
      </td>
      <td className="py-4 pl-9">
        <PiDotsThreeOutlineVerticalFill
          className="cursor-pointer"
          onClick={() => setOpenMenu(!openMenu)}
        />
        {openMenu && (
          <div
            className={`absolute flex flex-col right-[140px] p-3 px-5 gap-1 rounded-md font-bold ${
              darkMode
                ? "bg-gray-800 opacity-80 "
                : "border border-gray-300 bg-gray-100 "
            }`}
          >
            <button
              onClick={() => handleViewTask(task)}
              className={`cursor-pointer ${
                darkMode
                  ? "hover:text-gray-50 "
                  : "text-gray-700 hover:text-gray-500"
              } `}
            >
              View
            </button>
            <button
              onClick={() => document.getElementById("editTask").showModal()}
              className={` cursor-pointer ${
                darkMode
                  ? "hover:text-gray-50 "
                  : "text-gray-700 hover:text-gray-500"
              } `}
            >
              Edit
            </button>
              <dialog
              className={`bg-card border border-border rounded-md text-foreground`}
              id="editTask"
            >
              <div className={`w-[500px] px-10 py-4 rounded-md `}>
                <EditTask task={task}/>
              </div>
            </dialog>
            <button
              onClick={handleDeleteUser}
              className={`cursor-pointer  ${
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

export default Task;
