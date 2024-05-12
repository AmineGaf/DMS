import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { GoTasklist } from "react-icons/go";

const TotalProjects = () => {
  const { darkMode } = useContext(ThemeContext);

  const [totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/project/getAll")
      .then((response) => response.json())
      .then((data) => {
        const { projectsSum } = data;
        setTotalProjects(projectsSum);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  },[])

  return (
    <div
      className={`flex flex-col gap-3 items-end mt-10 ${
        darkMode ? "bg-cyan-800" : "bg-cyan-200"
      } p-6 pl-[180px] rounded-md`}
    >
      <GoTasklist
        className={`${
          darkMode ? "bg-cyan-900" : "bg-cyan-400"
        } h-12 w-12 p-2 rounded-md`}
      />
      <h1
        className={`${
          darkMode ? "text-white font-semibold" : "text-black font-semibold"
        }`}
      >
        {totalProjects}
      </h1>
      <h1 className={` ${darkMode ? "text-white" : "text-black"}`}>
        Total projects
      </h1>
    </div>
  );
};

export default TotalProjects;
