import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UsersData } from "./hooks/UsersData";
import { IoIosSearch } from "react-icons/io";
import User from "./components/User";
import AddUser from "./components/AddUser";

const Contacts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { darkMode } = useContext(ThemeContext);
  const [selectedSort, setSelectedSort] = useState("default");
  const [searchUser, setSearchUser] = useState("");
 

  const listTitles = [
    "Name",
    "Role",
    "Email",
    "Phone Number",
    "Joining Date",
    "Action",
  ];

  const { isLoading, data, isError, error } = UsersData(pageNumber);

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  //SORT USERS
  const sortedUsers = [...data.data.users];


  //SELECT USERS
  if (selectedSort === "newest") {
    sortedUsers.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } else if (selectedSort === "oldest") {
    sortedUsers.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }

  return (
    <div
      className="flex flex-col p-3 gap-[9px]"
    >
      <h1 className="text-lg">Contacts</h1>
      <div
         className={`flex flex-col p-3 md:px-7 md:py-5 w-full gap-4 rounded-md bg-primary-foreground`}
      >
        <div className="flex justify-between px-7 md:text-lg">
          <div>
            <button
              className={`p-2  rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 w-40 opacity-90`}
              onClick={() => document.getElementById("addUser").showModal()}
            >
              Add User
            </button>
            <dialog      
           className={`bg-card border border-border rounded-md text-foreground`}
            id="addUser" >
              <div className={`w-[500px] px-10 py-4 rounded-md`}>
                <AddUser />
              </div>

            </dialog>
          </div>

          <h1 className="mt-2">Users List</h1>
        </div>

        <div
          className={`flex flex-col md:flex-row justify-end gap-5 border-y py-6 border-dashed ${
            darkMode ? "border-gray-600" : "border-gray-400"
          }  `}
        >
          <div className="relative mt-[7px]">
            <input
              className={`flex w-full p-2 rounded-md border border-gray-400 ${
                darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100"
              }`}
              type="text"
              placeholder="...Search for User"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <div className="absolute inset-y-0 left-[380px] md:left-[180px] flex items-center pl-2 pointer-events-none">
              <IoIosSearch className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className={`w-full md:w-1/6 p-2 mt-2 rounded-md border border-gray-400 text-gray-400 cursor-pointer ${
              darkMode ? "bg-gray-900 " : "bg-gray-100"
            }`}
          >
            <option className="cursor-pointer" value="default">
              Default
            </option>
            <option className="cursor-pointer" value="newest">
              Newest
            </option>
            <option className="cursor-pointer" value="oldest">
              Oldest
            </option>
          </select>
        </div>
        <div>
          <table className="w-full ">
            <thead
              className={` rounded-md ${
                darkMode ? "bg-gray-800 opacity-70" : "bg-gray-200"
              }`}
            >
              <tr>
                {listTitles.map((item) => (
                  <th key={item} className="py-2 px-4 text-left">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedUsers
                ?.filter((user) =>
                  user.fullname.toLowerCase().includes(searchUser.toLowerCase())
                )
                ?.map((user) => {
                  return <User key={user._id} user={user} />;
                })}
            </tbody>
          </table>

          {!searchUser  && (
            <div className="flex relative justify-center gap-5 items-center  pt-5 ">
              <button
                className={`border p-2 rounded-md disabled:opacity-50 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 border-gray-600"
                }`}
                onClick={() => setPageNumber((page) => page - 1)}
                disabled={pageNumber === 1}
              >
                Prev Page
              </button>
              <h1
                className={`border p-2 rounded-md ${
                  darkMode ? "border-gray-800 " : "border-gray-200  "
                }`}
              >
                {pageNumber}
              </h1>
              <button
                className={`border p-2 rounded-md disabled:opacity-50 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 border-gray-600"
                }`}
                onClick={() => setPageNumber((page) => page + 1)}
                disabled={pageNumber === data?.data.totalPages}
              >
                Next page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;