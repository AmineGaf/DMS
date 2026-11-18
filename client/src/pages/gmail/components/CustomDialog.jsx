import React, { useState, useRef, useEffect, useContext } from 'react';
import { Cross2Icon } from "@radix-ui/react-icons";
import axios from "axios";
import { ThemeContext } from '../../../contexts/ThemeContext';

const CustomDialog = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const dialogRef = useRef(null);


  const {darkMode} = useContext(ThemeContext);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSendMail = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/sendmail", {
        to,
        subject,
        text,
      });

      if (response.status === 200) {
        // Email sent successfully, you can perform any necessary actions here
        console.log("Email sent successfully");
        // Optionally, you can close the dialog after sending the email
        closeDialog();
      } else {
        // Handle error if email sending fails
        console.error("Error sending email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        closeDialog();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button onClick={openDialog}>New mail</button>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center">
          <div ref={dialogRef} className={`bg-primary-foreground p-6 rounded-md w-96 ${darkMode ? "text-gray-300" : "text-gray-800"} `}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Compose Email</h2>
              <button onClick={closeDialog}>
                <Cross2Icon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMail();
              }}
            >
              <div className="mb-4">
                <label htmlFor="to" className="block mb-1">
                  To:
                </label>
                <input
                  type="email"
                  id="to"
                  name="to"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-md border bg-background p-2 focus:outline-none focus:border-ring border-gray-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-1">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-md border bg-background p-2 focus:outline-none focus:border-ring border-gray-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="text" className="block mb-1">
                  Message:
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-md border bg-background p-2 focus:outline-none focus:border-ring border-gray-500"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-4 py-2 rounded-md bg-gray-300 text-gray-800 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const DialogContent = ({ children }) => {
  return <div>{children}</div>;
};

const DialogHeader = ({ children }) => {
  return <div className="mb-2">{children}</div>;
};

const DialogTitle = ({ children }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>;
};

const DialogDescription = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

const DialogFooter = ({ children }) => {
  return <div>{children}</div>;
};

export { CustomDialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter };
