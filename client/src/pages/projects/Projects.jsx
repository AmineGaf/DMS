import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ProjectsData } from "./hooks/ProjectsData";
import { IoIosSearch } from "react-icons/io";
import AddProject from "./components/AddProject";
import Project from "./components/Project";

const Projects = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { darkMode } = useContext(ThemeContext);
  const [searchProject, setSearchProject] = useState("");

  const { isLoading, data, isError, error } = ProjectsData(pageNumber);

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div
      className={`flex flex-col p-3 gap-[9px]`}
    >
      <h1 className="text-lg">Projects</h1>
      <div
        className={`flex flex-col p-3 md:px-7 md:py-5 w-full gap-4 rounded-md bg-primary-foreground`}
      >
        <div className="flex justify-between px-7 md:text-lg">
          <div>
            <button
              className={`p-2  rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 w-40 opacity-90`}
              onClick={() => document.getElementById("addProject").showModal()}
            >
              Add Project
            </button>
            <dialog
              className={`
              bg-card border border-border rounded-md text-foreground
              `}
              id="addProject"
            >
              <div className={`w-[500px] px-10 py-4 rounded-md`}>
                <AddProject />
              </div>
            </dialog>
          </div>

          <h1 className="mt-2">Projects List</h1>
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
              placeholder="...Search for Project"
              value={searchProject}
              onChange={(e) => setSearchProject(e.target.value)}
            />
            <div className="absolute inset-y-0 left-[380px] md:left-[180px] flex items-center pl-2 pointer-events-none">
              <IoIosSearch className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-20 justify-center items-center">
            {data.data.projects
              ?.filter((project) =>
                project.title
                  .toLowerCase()
                  .includes(searchProject.toLowerCase())
              )
              ?.map((project) => {
                return <Project key={project._id} project={project} />;
              })}
          </div>
          {!searchProject && (
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
                disabled={pageNumber === data?.data.totalpages}
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

export default Projects;
