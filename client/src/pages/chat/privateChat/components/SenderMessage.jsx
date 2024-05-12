import axios from "axios";
import { useQuery } from "react-query";
import { format } from "timeago.js";


const SenderMessage = ({ userId, message }) => {
  const fetchUsers = () => {
    return axios.get(`http://localhost:3000/api/user/getbyid/${userId}`);
  };

  const { isLoading, data, isError, error } = useQuery("user", fetchUsers, {
    keepPreviousData: true,
  });

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }


  return (
    <div className="flex flex-col justify-start gap-1">
      <div className="flex gap-3">
        <img className="h-12 w-12 rounded-full" src={data?.data.image.url} alt="userImg" />
        <p className="max-w-[60%] bg-border rounded-md p-3 ">{message.text}</p>
      </div>
      <h1 className="text-gray-600 opacity-60 text-sm">{format(message.createdAt)}</h1>
    </div>
  );
};

export default SenderMessage;