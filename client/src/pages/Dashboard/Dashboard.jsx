import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import ProjectsChart from "./components/ProjectsChart";
import ProjectsStatistics from "./components/ProjectsStatistics";
import TotalEmployees from "./components/TotalEmployees";
import TotalProjects from "./components/TotalProjects";
import logoSE from "../../assets/logoSE.png";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={` flex flex-col gap-8 items-center pb-5
      ${darkMode ? "bg-primary-foreground" : "bg-blue-50"}  `}
    >
      <div className="flex items-center w-full ">
        <div className="hidden md:flex w-full justify-center">
          <img src={logoSE} alt="logoSE" className=" h-36" />
        </div>
        <div className="flex w-full justify-end gap-5 mr-10">
          <TotalEmployees />
          <TotalProjects />
        </div>
      </div>

      <div
        className={`flex flex-col w-[90%] rounded-md ${
          darkMode ? "bg-blue-950" : "bg-blue-200"
        } p-10`}
      >
        <h1 className={`${darkMode ? "text-white" : "text-blue-500"}`}>
          Projects statistics
        </h1>
        <ProjectsChart />
      </div>
      <div
        className={`flex flex-col w-[90%] rounded-md ${
          darkMode ? "bg-blue-950" : "bg-blue-200"
        } p-10`}
      >
        <h1>Project evolutions</h1>
        <ProjectsStatistics />
      </div>
    </div>
  );
};

export default Dashboard;
