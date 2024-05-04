import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { GrInProgress } from "react-icons/gr";
import { LuCheckCircle } from "react-icons/lu";

const TaskDetails = () => {
  const location = useLocation();
  const Task = location.state.task;
  const { darkMode } = useContext(ThemeContext);

  

  return (
    <div className={`flex flex-col pt-4 text-foreground gap-6`}>
      <h1 className="text-xl pl-5 flex gap-3">
        Task : <span className="font-bold">{Task.TaskName}</span>
      </h1>
      <div className="">
        <table className={`w-full `}>
          <thead className={`bg-primary-foreground `}>
            <tr className="">
              <th className="text-xl font-bold border border-border ">
                <h1>Not Started</h1>
              </th>
              <th className="text-xl font-bold border border-border  ">
                <h1 className="flex justify-center items-center gap-3 p-3">
                  <GrInProgress />
                  In Progress
                </h1>
              </th>
              <th className="text-xl font-bold border border-border ">
                <h1 className="flex justify-center items-center gap-3">
                  <LuCheckCircle />
                  Completed
                </h1>
              </th>
            </tr>
          </thead>
          <tbody className="text-center ">
            <td className="border border-border  ">
              {Task.TaskDetails?.filter(
                (task) => task.detailStatus === "notStarted"
              ).map((task) => (
                <div
                  key={task._id}
                  className="border border-border flex flex-col p-5 gap-5 "
                >
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-ring"> {task.detailName}</h1>
                    <p className="">{task.detailDescription}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h1 className="bg-input p-2 rounded-md">
                      {task.detailStatus}
                    </h1>
                    <h1 className="text-gray-600">
                      
                      {new Date(task.detailestimationDate).toLocaleDateString(
                        "en-US"
                      )}
                    </h1>
                  </div>
                </div>
              ))}
            </td>
            <td className="border border-border ">
              {Task.TaskDetails?.filter(
                (task) => task.detailStatus === "inProgress"
              ).map((task) => (
                <div
                  key={task._id}
                  className="border border-border flex flex-col p-5 gap-5  "
                >
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-ring"> {task.detailName}</h1>
                    <p className="">{task.detailDescription}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h1 className="bg-input p-2 rounded-md">
                      {task.detailStatus}
                    </h1>
                    <h1 className="text-gray-600">
                      
                      {new Date(task.detailestimationDate).toLocaleDateString(
                        "en-US"
                      )}
                    </h1>
                  </div>
                </div>
              ))}
            </td>
            <td className="border border-border">
              {Task.TaskDetails?.filter(
                (task) => task.detailStatus === "completed"
              ).map((task) => (
                <div
                  key={task._id}
                  className="border border-border flex flex-col p-5 gap-5"
                >
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-ring"> {task.detailName}</h1>
                    <p className="">{task.detailDescription}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h1 className="bg-input p-2 rounded-md">
                      {task.detailStatus}
                    </h1>
                    <h1 className="text-gray-600">
                      
                      {new Date(task.detailestimationDate).toLocaleDateString(
                        "en-US"
                      )}
                    </h1>
                  </div>
                </div>
              ))}
            </td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskDetails;
