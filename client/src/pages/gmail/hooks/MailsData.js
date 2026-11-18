import { useQuery } from "react-query";
import axios from "axios";

const fetchMails = (page) => {
  return axios.get(`http://localhost:3000/api/gmail/messages?page=${page}`);
};

export const MailsData = (currentPage) => {
  return useQuery(
    ["mails", currentPage],
    () => {
      return fetchMails(currentPage);
    },
    {
      keepPreviousData: true,
      staleTime: 60000, // Data remains valid for 1 minute
    }
  );
};
