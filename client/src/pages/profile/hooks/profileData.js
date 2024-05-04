import { useQuery } from "react-query";
import axios from "axios";


const fetchUser = userEmail => {
    return axios.get(`http://localhost:3000/api/user/get/${userEmail}`)
}

export const useUserData = (userEmail) => {
    return useQuery(['user', userEmail], () => fetchUser(userEmail))
}