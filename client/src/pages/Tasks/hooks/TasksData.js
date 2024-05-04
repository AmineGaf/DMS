import { useQuery } from "react-query";
import axios from "axios";

const fetchTasks = ({ pageNumber, userId }) => {
  return axios.get(
    `http://localhost:3000/api/task/getAllTasks?page=${pageNumber}&userId=${userId}`);
};

export const TasksData = (pageNumber, userId) => {
  return useQuery(
    ["tasks", pageNumber, userId],
    () => {
      return fetchTasks({ pageNumber, userId });
    },
    {
      keepPreviousData: true,
    }
  );
};
