import axios from "axios";
import { useQuery } from "react-query";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

const NotificationDetails = ({ notification }) => {
  const navigate = useNavigate();

  //get sender innformations
  const fetchUsers = () => {
    return axios.get(
      `http://localhost:3000/api/user/getbyid/${notification?.senderId}`
    );
  };

  const { isLoading, data, isError, error } = useQuery(
    ["user", notification.senderId],
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

  const user = data.data;

  const handleSubmit = async (notification) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/notification/conversation?senderId=${notification.senderId}&receiverId=${notification.receiverId}`
      );
      if (res.status === 200) {
        navigate("/chat/private", { state: res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div
      className="flex items-center gap-2 mb-4 cursor-pointer"
      onClick={() => handleSubmit(notification)}
    >
      <div>
        <img
          src={user.image.url}
          alt="userImage"
          className="h-11 w-11 rounded-full"
        />
      </div>
      <div className="flex flex-col ">
        <h1 className="text-primary text-lg">{user.fullname}</h1>
        <div className="flex gap-5">
          <p>{notification.text}</p>
          <h1 className="text-gray-600 opacity-60 text-sm">
            {format(notification.createdAt).substring(0, 4)}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
