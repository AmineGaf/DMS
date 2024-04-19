import { useQuery } from 'react-query';
import axios from 'axios';

const fetchTasks = (pageNumber) => {
    return axios.get(`http://localhost:3000/api/task/getAllTasks?page=${pageNumber}`);
  };

export const TasksData = (pageNumber) => {
    return useQuery(
        ["tasks", pageNumber],
        () => {
          return fetchTasks(pageNumber);
        },
        {
          keepPreviousData: true,
        }
      );
}

