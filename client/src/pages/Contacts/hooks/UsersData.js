import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUsers = (pageNumber) => {
    return axios.get(`http://localhost:3000/api/user/getAll?page=${pageNumber}`);
  };

export const UsersData = (pageNumber) => {
    return useQuery(
        ["users", pageNumber],
        () => {
          return fetchUsers(pageNumber);
        },
        {
          keepPreviousData: true,
        }
      );
}

