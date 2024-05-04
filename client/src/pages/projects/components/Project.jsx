import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const Project = ({ project }) => {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const handleProjectDetails = (project) => {
    navigate(`/projectDetails/${project.title}`, { state: { project } });
  };

  return (
    <div
      className={` flex flex-col justify-center items-center gap-4 p-14 rounded-md shadow-sm  cursor-pointer bg-background hover:shadow-xl border border-border opacity-90 `}
    >
      <img
        src={project.logo.url}
        alt="logo"
        className="w-[130px] h-[130px] rounded-full "
      />
      <h1 className="text-xl">{project.title}</h1>
      <button
        onClick={() => handleProjectDetails(project)}
        className={`w-full p-2 rounded-md text-lg border border-border hover:bg-primary-foreground`}
      >
        View
      </button>
    </div>
  );
};

export default Project;
