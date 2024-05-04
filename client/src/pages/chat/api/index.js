import axios from "axios";

export const fetchMessages = (currentChat) => {
  return axios.get(`http://localhost:3000/api/messages/${currentChat._id}`);
};
