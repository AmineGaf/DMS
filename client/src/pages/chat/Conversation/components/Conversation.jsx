import axios from "axios";
import { useQuery } from "react-query";

const Conversation = ({ conversation, currentUser }) => {

  const fetchUsers = () => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    return axios.get(`http://localhost:3000/api/user/getbyid/${friendId}`);
  };

  const { isLoading, data, isError, error } = useQuery(["user", conversation._id], fetchUsers, {
    keepPreviousData: true,
  });

  if(isLoading){
    return <h2>Loading ...</h2>
  }
  if(isError){
    return <h2>{error.message}</h2>
  }
  


  return (
    <div className="flex gap-4 items-center cursor-pointer relative">
      <div className="absolute h-[11px] w-[11px]  bg-green-500 rounded-full bottom-[36px] left-[2px] border border-background"  />
      <img className="h-12 w-12 rounded-full" src={data?.data.image.url} alt="" />
      <h1 className="text-lg">{data?.data.fullname}</h1>
    </div>
  );
};

export default Conversation;
