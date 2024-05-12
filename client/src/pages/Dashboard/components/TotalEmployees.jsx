
import { useContext, useEffect, useState } from "react";
import { PiUsersLight } from "react-icons/pi";
import { ThemeContext } from "../../../contexts/ThemeContext";

const TotalEmployees = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);

  const { darkMode } = useContext(ThemeContext);


  useEffect(() => {
    fetch("http://localhost:3000/api/user/getAll")
      .then((response) => response.json())
      .then((data) => {
        const { totalUsers } = data;
        setTotalEmployees(totalUsers);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  return (
    <div
      className={`flex flex-col gap-3 items-end mt-10 ${
        darkMode ? "bg-green-700" : "bg-green-200"
      } p-6 pl-[180px] rounded-md`}
    >
      <PiUsersLight
        className={`${
          darkMode ? "bg-green-800" : "bg-green-400"
        } h-12 w-12 p-2 rounded-md`}
      />
      <h1
        className={`${
          darkMode ? "text-white font-semibold" : "text-black font-semibold"
        }`}
      >
        {totalEmployees}
      </h1>
      <h1 className={` ${darkMode ? "text-white" : "text-black"}`}>
        Total employees
      </h1>
    </div>
  );
};

export default TotalEmployees;
