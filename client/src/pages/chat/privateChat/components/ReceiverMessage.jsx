import { format } from "timeago.js";

const ReceiverMessage = ({ message }) => {
  return (
    <div className="flex flex-col gap-1 items-end text-gray-200 ">
      <p className="max-w-[60%] bg-primary rounded-md p-3">{message.text}</p>
      <h1 className="text-gray-600 opacity-60 text-sm">
        {format(message.createdAt)}
      </h1>
    </div>
  );
};

export default ReceiverMessage;
