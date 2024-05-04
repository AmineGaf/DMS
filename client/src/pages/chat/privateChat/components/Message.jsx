import ReceiverMessage from "./ReceiverMessage";
import SenderMessage from "./SenderMessage";

const Message = ({ message, own }) => {
  return (
    <div>
      {own ? (
        <ReceiverMessage message={message} />
      ) : (
        <SenderMessage userId={message.sender} message={message} />
      )}
    </div>
  );
};

export default Message;
