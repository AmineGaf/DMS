import React, { useContext, useState } from "react";
import { MailsData } from "./hooks/MailsData";
import { IoIosSearch } from "react-icons/io";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Gmail = () => {
  const { darkMode } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchMail, setSearchMail] = useState("");
  const navigate = useNavigate();

  const { isLoading, data, isError, error, isFetching } =
    MailsData(currentPage);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const totalPages = data?.totalPages || 0;



  //navigation to gmail details
  const hadleGmailNavigation = (mail) => {
    navigate(`/gmail/${mail.id}`, {state: mail});
  }


  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col p-6 gap-10">
      <div className="flex justify-between items-center mx-4">
        <div className="flex w-2/3 relative">
          <input
            className="rounded-md w-full border bg-background p-2 h-10 focus:outline-none focus:border-ring border-gray-500"
            type="text"
            placeholder="Search for friends"
            value={searchMail}
            onChange={(e) => setSearchMail(e.target.value)}
          />
          <span className="absolute top-2 right-3 text-gray-300">
            <IoIosSearch className="text-2xl" />
          </span>
        </div>
        <button className="p-2 rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 max-w-40 opacity-90">
          Send mail
        </button>
      </div>
      {data?.data.messages
        ?.filter((mail) =>
          mail.name.toLowerCase().includes(searchMail.toLowerCase())
        )
        .map((mail) => (
          <div 
          key={mail.id}
          onClick={() => hadleGmailNavigation(mail)}
          className="flex gap-4 items-center cursor-pointer hover:shadow-xl">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
              {mail.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <h1 className="text-primary font-bold">{mail.name}</h1>
              <div className="flex items-center">
                <p className="text-sm truncate">{mail.subjectMessage}</p>
                <p className="truncate text-gray-400 text-xs ml-2">
                  - {mail.text.substring(0, 50)}...
                </p>
              </div>
            </div>
          </div>
        ))}

      {!searchMail && (
        <div className="flex relative  gap-5 items-center ">
          <button
            className={`border p-2 rounded-md disabled:opacity-50 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 border-gray-600"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1 || isLoading}
          >
            Prev Page
          </button>
          <h1
            className={`border p-2 rounded-md ${
              darkMode ? "border-gray-800 " : "border-gray-200  "
            }`}
          >
            {currentPage}
          </h1>
          <button
            className={`border p-2 rounded-md disabled:opacity-50 ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 border-gray-600"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isLoading}
          >
            Next page
          </button>
        </div>
      )}
    </div>
  );
};

export default Gmail;
