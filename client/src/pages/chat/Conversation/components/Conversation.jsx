import axios from "axios";
import { useEffect } from "react";
import { useQuery } from "react-query";

const Conversation = ({
  conversation,
  currentUser,
  connectedUsers,
  friendName,
}) => {
  const fetchUsers = () => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    return axios.get(`http://localhost:3000/api/user/getbyid/${friendId}`);
  };

  const { isLoading, data, isError, error } = useQuery(
    ["user", conversation._id],
    fetchUsers,
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const user = data?.data;
  const isConnectedUser = connectedUsers.some(
    (connectedUser) => connectedUser.userId === user?._id
  );

  return (
    <>
      {user?.fullname.toLowerCase().includes(friendName) && (
        <div className="flex gap-4 items-center cursor-pointer relative">
          {isConnectedUser && (
            <div className="absolute h-[11px] w-[11px] bg-green-500 rounded-full bottom-[36px] left-[2px] border border-background" />
          )}
          <img
            className="h-12 w-12 rounded-full"
            src={user?.image.url}
            alt=""
          />
          <h1 className="text-lg">{user?.fullname}</h1>
        </div>
      )}
    </>
  );
};

export default Conversation;
