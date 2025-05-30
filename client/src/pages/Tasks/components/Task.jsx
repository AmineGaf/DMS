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
    navigate(`/taskDetails/${task._id}`, { state: { task } });
  };
  return (
    <tr
      className={`border-y ${
        darkMode ? "border-gray-800" : "border-gray-200"
      } `}
    >
      <td className="py-4 px-4 ">{task.TaskName}</td>
      <td className="py-4 px-4">{task.ProjectName}</td>
      <td className="py-4 px-4">{task.ResponsibleUser}</td>

      {task.Status === "In progress" ? (
        <td
          className={`flex justify-center ml-3 bg-gradient-to-r from-blue-700 to-cyan-400 text-blue-100 font-bold mt-4 py-1 max-w-[150px] rounded-md ${
            darkMode ? "" : "opacity-80"
          }`}
        >
          {" "}
          In progress
        </td>
      ) : task.Status === "Completed" ? (
        <td
          className={`flex justify-center ml-3 bg-gradient-to-r from-green-600 to-green-400 text-blue-100 font-bold mt-4 py-1 max-w-[150px] rounded-md ${
            darkMode ? "" : "opacity-80"
          }`}
        >
          Completed
        </td>
      ) : (
        <td
          className={`flex justify-center ml-3 bg-gradient-to-r from-red-600 to-red-400 text-blue-100 font-bold mt-4 py-1 max-w-[150px] rounded-md ${
            darkMode ? "" : "opacity-80"
          }`}
        >
          Not Started
        </td>
      )}

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
            className={`absolute flex flex-col z-10 right-[140px] p-3 px-5 gap-1 rounded-md bg-background text-lg `}
          >
            <button
              onClick={() => handleViewTask(task)}
              className="cursor-pointer hover:font-bold"
            >
              View
            </button>
            <button
              onClick={() => document.getElementById("editTask").showModal()}
              className="cursor-pointer hover:font-bold"
            >
              Edit
            </button>
            <dialog
              className={`bg-card border border-border rounded-md text-foreground`}
              id="editTask"
            >
              <div className={`w-[500px] px-10 py-4 rounded-md `}>
                <EditTask task={task} />
              </div>
            </dialog>
            <button
              onClick={handleDeleteUser}
              className="cursor-pointer hover:font-bold"
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
