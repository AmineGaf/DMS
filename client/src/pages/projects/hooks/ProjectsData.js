import { useQuery } from "react-query";
import axios from "axios";
import { DEV_API_URL } from "../../../config";

const fetchProjects = ({pageNumber, userId }) => {
  return axios.get(`${DEV_API_URL}/project/getAll?page=${pageNumber}&userId=${userId}`);
};

export const ProjectsData = (pageNumber, userId) => {
  return useQuery(
    ["projects", pageNumber, userId],
    () => {
      return fetchProjects({pageNumber, userId});
    },
    {
      keepPreviousData: true,
    }
  );
};
