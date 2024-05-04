import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { TasksData } from "./hooks/TasksData";
import { IoIosSearch } from "react-icons/io";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import Navbar from "../../components/Navbar";
import { AuthContext } from "../Auth/contexts/AuthContext";

const Tasks = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { darkMode } = useContext(ThemeContext);
  const [selectedSort, setSelectedSort] = useState("default");
  const [selectedStatus, setSelectedStatus] = useState("default Status");
  const [searchTask, setSearchTask] = useState("");

  const {user} = useContext(AuthContext);

  const listTitles = [
    "Task Name",
    "Project Name",
    "Status",
    "Responsible User",
    "Due Date",
    "Action",
  ];
  const statusList = {
    "Not Started": "Not Started",
    "In progress": "In progress",
    Completed: "Completed",
  };

  
  const userId = user._id;
  const { isLoading, data, isError, error } = TasksData(pageNumber, userId);

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  //SORT Tasks
  let sortedTasks = [...data.data.tasks];

  //SELECT Tasks by date
  if (selectedSort === "newest") {
    sortedTasks.sort((a, b) => new Date(b.DueDate) - new Date(a.DueDate));
  } else if (selectedSort === "oldest") {
    sortedTasks.sort((a, b) => new Date(a.DueDate) - new Date(b.DueDate));
  }
  // SELECT Tasks by status
  if (selectedStatus !== "default Status") {
    sortedTasks = sortedTasks.filter(
      (task) => task.Status === statusList[selectedStatus]
    );
  }

  return (
    <div
      className={`flex flex-col p-3 gap-[9px]  `}
    >

      <h1 className="text-lg">Tasks</h1>
      <div
        className={`flex flex-col p-3 md:px-7 md:py-5 w-full gap-4 rounded-md bg-primary-foreground `}
      >
        <div className="flex justify-between px-7 md:text-lg">
          <div>
            <button
              className={`p-2  rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 w-40 opacity-90`}
              onClick={() => document.getElementById("addTask").showModal()}
            >
              Add Task
            </button>
            <dialog
              className={`bg-card border border-border rounded-md text-foreground`}
              id="addTask"
            >
              <div className={`w-[500px] px-10 py-4 rounded-md `}>
                <AddTask userId={userId} />
              </div>
            </dialog>
          </div>

          <h1 className="mt-2">Tasks List</h1>
        </div>

        <div
          className={`flex flex-col md:flex-row justify-end gap-5 border-y py-6 border-dashed ${
            darkMode ? "border-gray-600" : "border-gray-400"
          }  `}
        >
          <div className="relative mt-[7px]">
            <input
              className={`flex w-full p-2 rounded-md border border-gray-400 ${
                darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100"
              }`}
              type="text"
              placeholder="...Search for Task"
              value={searchTask}
              onChange={(e) => setSearchTask(e.target.value)}
            />
            <div className="absolute inset-y-0 left-[380px] md:left-[180px] flex items-center pl-2 pointer-events-none">
              <IoIosSearch className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className={`w-full md:w-1/6 p-2 mt-2 rounded-md border border-gray-400 text-gray-400 cursor-pointer ${
              darkMode ? "bg-gray-900 " : "bg-gray-100"
            }`}
          >
            <option className="cursor-pointer" value="default">
              Default Date
            </option>
            <option className="cursor-pointer" value="oldest">
              oldest
            </option>
            <option className="cursor-pointer" value="newest">
              newest
            </option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className={`w-full md:w-1/6 p-2 mt-2 rounded-md border border-gray-400 text-gray-400 cursor-pointer ${
              darkMode ? "bg-gray-900 " : "bg-gray-100"
            }`}
          >
            <option className="cursor-pointer" value="default Status">
              Default Status
            </option>
            <option className="cursor-pointer" value="Not Started">
              Not Started
            </option>
            <option className="cursor-pointer" value="In progress">
              In progress
            </option>
            <option className="cursor-pointer" value="Completed">
              Completed
            </option>
          </select>
        </div>
        <div>
          <table className="w-full ">
            <thead
              className={` rounded-md ${
                darkMode ? "bg-gray-800 opacity-70" : "bg-gray-200"
              }`}
            >
              <tr>
                {listTitles.map((item) => (
                  <th key={item} className="py-2 px-4 text-left">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedTasks
                ?.filter((task) =>
                  task.TaskName.toLowerCase().includes(searchTask.toLowerCase())
                )
                ?.map((task) => {
                  return <Task key={task._id} task={task} />;
                })}
            </tbody>
          </table>

          {!searchTask && (
            <div className="flex relative justify-center gap-5 items-center  pt-5 ">
              <button
                className={`border p-2 rounded-md disabled:opacity-50 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 border-gray-600"
                }`}
                onClick={() => setPageNumber((page) => page - 1)}
                disabled={pageNumber === 1}
              >
                Prev Page
              </button>
              <h1
                className={`border p-2 rounded-md ${
                  darkMode ? "border-gray-800 " : "border-gray-200  "
                }`}
              >
                {pageNumber}
              </h1>
              <button
                className={`border p-2 rounded-md disabled:opacity-50 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 border-gray-600"
                }`}
                onClick={() => setPageNumber((page) => page + 1)}
                disabled={pageNumber === data?.data.totalPages}
              >
                Next page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
