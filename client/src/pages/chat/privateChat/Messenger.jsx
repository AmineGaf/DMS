import Message from "./components/Message";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Conversation from "../Conversation/components/Conversation";
import { IoIosSearch } from "react-icons/io";
import { LuSendHorizonal } from "react-icons/lu";
import { AuthContext } from "../../Auth/contexts/AuthContext";
import { ThemeContext } from "../../../contexts/ThemeContext";
import AddContact from "../components/AddContact";
import { useQuery } from "react-query";
import SenderMessage from "./components/SenderMessage";
import ReceiverMessage from "./components/ReceiverMessage";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [contacts, setContacts] = useState(true);

  const [searchContact, setSearchContact] = useState("");
  const [searchFriend, setSearchFriend] = useState("");

  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/conversation/getconverstion/${user._id}`
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id, conversations]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const res = await axios.get(
            `http://localhost:3000/api/messages/${currentChat._id}`
          );
          setMessages(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/api/messages/addMessage",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //FETCH CONTACTS (all users who use the app)
  const fetchContacts = () => {
    return axios.get(
      `http://localhost:3000/api/conversation/contacts/${user._id}`
    );
  };

  const { isLoading, data, isError, error } = useQuery(
    "contacts",
    fetchContacts,
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

  const handleAddConversation = async (contact) => {
    const res = await axios.post(
      "http://localhost:3000/api/conversation/addconversation",
      {
        senderId: user._id,
        receiverId: contact._id,
      }
    );
    if (res.status === 200) {
      setCurrentChat(res.data);
    }
  };

  return (
    <>
      <div className="flex p-10 gap-10 h-[706px]">
        <div className="flex-[1] flex-col gap-3">
          <div className="pb-3">
            {contacts ? (
              <button
                className="max-w-[50%] p-2 border border-gray-600 rounded-md hover:bg-border"
                onClick={() => setContacts(!contacts)}
              >
                Contacts
              </button>
            ) : (
              <button
                className="max-w-[50%] p-2 border border-gray-600 rounded-md hover:bg-border"
                onClick={() => setContacts(!contacts)}
              >
                Messages
              </button>
            )}
          </div>

          {contacts ? (
            <div>
              <div className="relative">
                <input
                  className="rounded-md w-full border bg-background p-2 h-10 focus:outline-none focus:border-ring border-gray-300"
                  type="text"
                  placeholder="Search for friends"
                  value={searchFriend}
                  onChange={(e) => setSearchFriend(e.target.value)}
                />
                <span className="absolute top-2 right-3 text-gray-300">
                  <IoIosSearch className="text-2xl" />
                </span>
              </div>
              <div className="flex flex-col gap-5 pt-5 h-[530px] overflow-auto no-scrollbar ">
                {conversations.map((c) => (
                  <div key={c._id} onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="relative">
                <input
                  className="rounded-md w-full border bg-background p-2 h-10 focus:outline-none focus:border-ring border-gray-300"
                  type="text"
                  placeholder="Search for contact"
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                />
                <span className="absolute top-2 right-3 text-gray-300">
                  <IoIosSearch className="text-2xl" />
                </span>
              </div>

              <div className="flex flex-col gap-5 pt-5  h-[530px] overflow-auto no-scrollbar">
                {data?.data
                  ?.filter((contact) =>
                    contact.fullname
                      .toLowerCase()
                      .includes(searchContact.toLowerCase())
                  )
                  .map((c) => (
                    <div key={c._id} onClick={() => handleAddConversation(c)}>
                      <AddContact contact={c} />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-[4] border-l border-border p-3 relative">
          <div className="flex flex-col gap-10">
            {currentChat ? (
              <div className="flex flex-col gap-7 h-[570px] overflow-auto no-scrollbar">
                <div className="flex flex-col gap-4">
                  {messages.map((m, key) => (
                    <div key={key} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="gap-3 flex absolute bottom-[-27px] w-full bg-background py-2 ">
                  <input
                    className={`rounded-md flex-1 h-14 border bg-background p-2 focus:outline-none focus:border-ring ${
                      darkMode ? "border-border" : "border-gray-300"
                    }`}
                    type="text"
                    placeholder="Write something..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    onClick={handleSubmit}
                    className="p-2 bg-primary text-white rounded-md flex items-center gap-2 px-4"
                  >
                    Send
                    <LuSendHorizonal />
                  </button>
                </div>
              </div>
            ) : (
              <span className="flex justify-center pt-40 text-2xl text-gray-300">
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
