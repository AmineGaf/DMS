import { useQuery } from 'react-query';
import axios from 'axios';

const fetchProjects = (pageNumber) => {
    return axios.get(`http://localhost:3000/api/project/getAll?page=${pageNumber}`);
  };

export const ProjectsData = (pageNumber) => {
    return useQuery(
        ["projects", pageNumber],
        () => {
          return fetchProjects(pageNumber);
        },
        {
          keepPreviousData: true,
        }
      );
}