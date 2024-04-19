import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";

const TaskDetails = () => {
  const location = useLocation();
  const Task = location.state.task;
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col pt-4 gap-6 h-[659px] ${
      darkMode ? "bg-gray-950 text-gray-300" : "bg-gray-100 text-gray-950"
    }`}>
      <h1 className="text-xl pl-5 flex gap-3">Task : <span className="font-bold">{Task.TaskName}</span></h1>
      <div
        className=""
      >
        <table className={`w-full border-collapse border `}>
          <tr
            className={`${darkMode ? "bg-gray-800 opacity-70" : "bg-gray-200"}`}
          >
            <th className="text-2xl font-bold border border-slate-600 ">
              Not Started
            </th>
            <th className="text-2xl font-bold border border-slate-600">
              In Progress
            </th>
            <th className="text-2xl font-bold border border-slate-600">
              Completed
            </th>
          </tr>
          <tr className="text-center">
            <td className="border border-slate-600">hello</td>
            <td className="border border-slate-600">azeaze</td>
            <td className="border border-slate-600">azeazaze</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default TaskDetails;
