import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";


const ProjectDetails = () => {
  const project = useLocation().state.project;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  //DELETE Project
  const deleteProjectMutation = useMutation(
    (id) => axios.delete(`http://localhost:3000/api/project/deleteproject/${id}`),
    {
      onSuccess: () => {
        navigate('/projects');
        queryClient.invalidateQueries("projects");
      },
    }
  );
  const handleDeleteProject = () => {
    deleteProjectMutation.mutate(project._id);
  }


  return (
    <div className="flex p-5 gap-2">
      <div className="flex flex-col bg-primary-foreground rounded-md p-5 gap-[80px] max-w-[300px] justify-center items-center  ">
        <img
          src={project.logo.url}
          alt="logo"
          className="rounded-full h-[200px] w-[200px]"
        />
        <div className="flex flex-col gap-7">
          <h1 className="text-2xl font-semibold">{project.title}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
            accusamus ullam? Iste ea nesciunt rerum quo fugit? Saepe nemo
            voluptas{" "}
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-ring">Project Manager</h1>
            <h1>{project.ProjectManager}</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-ring">Team size</h1>
            <h1>10</h1>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-lg text-ring">Creation Date</h1>
            <h1>{`${new Date(project.CreationDate).toLocaleDateString(
              "en-US"
            )}`}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 gap-10 max-w-screen-md ">
        <div className="flex flex-col gap-5">
          <h1 className="text-xl text-ring">Challenges</h1>
          <p className="">{project.challenges}</p>
        </div>
        <div className="">
          <h1 className="text-xl text-ring">Solution</h1>
          <p className="">{project.solution}</p>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl text-ring">Team</h1>
          <table className="table">
            <thead className="">
              <tr className="">
                <th className="border border-border">Member Name</th>
                <th className="border border-border">Member Role</th>
              </tr>
            </thead>
            <tbody>
              {project.team.map((member) => (
                <tr key={member._id}>
                  <td className="border border-border">
                    <Link
                      to={`/profile/${member.MemberEmail}`}
                      state={member.MemberEmail}
                      className="text-ring hover:text-foreground opacity-90"
                    >
                      {member.MemberEmail}
                    </Link>
                  </td>
                  <td className="border border-border">{member.MemberRole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-xl text-ring">Documentation</h1>
          <a
            className="hover:text-primary underline"
            href={project.documentation.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Check Documentation Here
          </a>
        </div>
      </div>
      <div>
      <MdDeleteOutline 
      onClick={handleDeleteProject}
      className="text-3xl cursor-pointer ml-20 hover:text-primary"/>
      </div>
    </div>
  );
};

export default ProjectDetails;
