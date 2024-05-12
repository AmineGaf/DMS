import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GrInProgress } from "react-icons/gr";
import { LuCheckCircle } from "react-icons/lu";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const TaskDetails = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const Task = location.state.task;

  const [updatedTaskDetails, setUpdatedTaskDetails] = useState(
    Task?.TaskDetails || []
  );

  const editTask = useMutation(
    async (updatedTask) => {
      const response = await axios.patch(
        `http://localhost:3000/api/task/updatetask/${Task._id}`,
        updatedTask
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("tasks");
      },
    }
  );
  const handleUpdateStatus = async (value, taskId) => {
    const updatedDetails = Task.TaskDetails.map((task) =>
      task._id === taskId ? { ...task, detailStatus: value } : task
    );

    setUpdatedTaskDetails(updatedDetails);

    const updatedTask = {
      TaskDetails: updatedDetails,
    };

    await editTask.mutateAsync(updatedTask);

    queryClient.invalidateQueries("tasks");
  };

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries("tasks");
    };

    fetchData();
  }, [Task, updatedTaskDetails, queryClient]);

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
              {updatedTaskDetails
                ?.filter((task) => task.detailStatus === "notStarted")
                .map((task) => (
                  <div
                    key={task._id}
                    className="border border-border flex flex-col p-5 gap-5 "
                  >
                    <div className="flex flex-col items-start gap-2">
                      <h1 className="text-ring"> {task.detailName}</h1>
                      <p className="">{task.detailDescription}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <select
                        name="detailsStatus"
                        id="detailsStatus"
                        value={task.detailStatus}
                        onChange={(e) =>
                          handleUpdateStatus(e.target.value, task._id)
                        }
                        className="bg-input p-2 rounded-md"
                      >
                        <option value="notStarted">Not Started</option>
                        <option value="inProgress">In progress</option>
                        <option value="completed">Completed</option>
                      </select>
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
              {updatedTaskDetails
                ?.filter((task) => task.detailStatus === "inProgress")
                .map((task) => (
                  <div
                    key={task._id}
                    className="border border-border flex flex-col p-5 gap-5  "
                  >
                    <div className="flex flex-col items-start gap-2">
                      <h1 className="text-ring"> {task.detailName}</h1>
                      <p className="">{task.detailDescription}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <select
                        name="detailsStatus"
                        id="detailsStatus"
                        value={task.detailStatus}
                        onChange={(e) =>
                          handleUpdateStatus(e.target.value, task._id)
                        }
                        className="bg-input p-2 rounded-md"
                      >
                        <option value="notStarted">Not Started</option>
                        <option value="inProgress">In progress</option>
                        <option value="completed">Completed</option>
                      </select>
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
              {updatedTaskDetails
                ?.filter((task) => task.detailStatus === "completed")
                .map((task) => (
                  <div
                    key={task._id}
                    className="border border-border flex flex-col p-5 gap-5"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <h1 className="text-ring"> {task.detailName}</h1>
                      <p className="">{task.detailDescription}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <select
                        name="detailsStatus"
                        id="detailsStatus"
                        value={task.detailStatus}
                        onChange={(e) =>
                          handleUpdateStatus(e.target.value, task._id)
                        }
                        className="bg-input p-2 rounded-md"
                      >
                        <option value="notStarted">Not Started</option>
                        <option value="inProgress">In progress</option>
                        <option value="completed">Completed</option>
                      </select>
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
