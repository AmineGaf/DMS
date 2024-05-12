import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { IoCloseSharp } from "react-icons/io5";

const AddProject = ({ userId }) => {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { darkMode } = useContext(ThemeContext);
  const [image, setImage] = useState([]);
  const [doc, setDoc] = useState([]);

  const addProject = useMutation(
    async (values) => {
      const response = await axios.post(
        "http://localhost:3000/api/project/addProject",
        { ...values, userId }
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("projects");
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      title: "",
      projectType: "",
      logo: "",
      ProjectManager: "",
      team: [{ MemberEmail: "", MemberRole: "" }],
      CreationDate: "",
      description: "",
      challenges: "",
      solution: "",
      documentation: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Project Title is required"),
      projectType: Yup.string().required("Project type Title is required"),
      // logo: Yup.string().required("Project Logo is required"),
      ProjectManager: Yup.string().required("Project Manager Name is required"),
      // "team[0].MemberName": Yup.string().required("Member Name is required"),
      // "team.0.MemberRole": Yup.string().required("Member Role is required"),
      CreationDate: Yup.date().required("Creation Date is required"),
      description: Yup.string().required("Description is required"),
      challenges: Yup.string().required("Challanges is required"),
      solution: Yup.string().required("Solution is required"),
      // documentation: Yup.string().required("Project documentation is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.logo = image;
      values.documentation = doc;
      addProject.mutate(values);
      resetForm();
    },
  });

  const handleMeMemberEmailChange = (index, event) => {
    const newMembers = [...formik.values.team];
    newMembers[index].MemberEmail = event.target.value;
    formik.setFieldValue("team", newMembers);
  };

  const handleMemberRoleChange = (index, event) => {
    const newMembers = [...formik.values.team];
    newMembers[index].MemberRole = event.target.value;
    formik.setFieldValue("team", newMembers);
  };

  const addMember = () => {
    const newMembers = [
      ...formik.values.team,
      { MemberEmail: "", MemberRole: "" },
    ];
    formik.setFieldValue("team", newMembers);
  };

  const removeMember = (index) => {
    const newMembers = [...formik.values.team];
    newMembers.splice(index, 1);
    formik.setFieldValue("team", newMembers);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleDoc = (e) => {
    const file = e.target.files[0];
    setDocToBase(file);
  };

  const setDocToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setDoc(reader.result);
    };
  };
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      <div
        className="flex cursor-pointer justify-end relative text-2xl left-5"
        onClick={() => document.getElementById("addProject").close()}
      >
        <IoCloseSharp />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="title">
          Project Title
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="title"
          placeholder="...project title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.title && formik.errors.title
            ? formik.errors.title
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="title">
          Project type
        </label>
        <select
          name="projectType"
          value={formik.values.projectType}
          onChange={formik.handleChange}
          className="w-full rounded-md bg-input border border-border py-2"
        >
          <option>Select option</option>
          <option>IOT</option>
          <option>Embedded system</option>
          <option>Software Developement</option>
          <option>Artificial intelligence</option>
        </select>
        {/* <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="title"
          placeholder="...project type"
          value={formik.values.projectType}
          onChange={formik.handleChange}
        /> */}
        <h1 className="text-red-400">
          {formik.touched.title && formik.errors.title
            ? formik.errors.title
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="logo">
          Project Logo
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          onChange={handleImage}
          type="file"
          id="formupload"
          name="logo"
        />
        {/* <h1 className="text-red-400">
          {formik.touched.logo && formik.errors.logo ? formik.errors.logo : ""}
        </h1> */}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="ProjectManager">
          Project Manager Name
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="ProjectManager"
          placeholder="...project manager"
          value={formik.values.ProjectManager}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.ProjectManager && formik.errors.ProjectManager
            ? formik.errors.ProjectManager
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl">Team Members</label>
        {formik.values.team.map((member, index) => (
          <div key={index} className="flex gap-2">
            <input
              className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
              type="text"
              placeholder="Member email"
              value={member.MemberName}
              onChange={(event) => handleMeMemberEmailChange(index, event)}
            />
            <input
              className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
              type="text"
              placeholder="Member Role"
              value={member.MemberRole}
              onChange={(event) => handleMemberRoleChange(index, event)}
            />
            {formik.values.team.length > 1 && (
              <button
                type="button"
                onClick={() => removeMember(index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  darkMode
                    ? "bg-gray-900 text-gray-400"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addMember}
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-200 text-gray-600"
          }`}
        >
          +
        </button>
        <h1 className="text-red-400">
          {formik.touched.team &&
          (formik.errors["team.0.MemberName"] ||
            formik.errors["team.0.MemberRole"])
            ? "Member Name and Member Role are required"
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="CreationDate">
          Creation Date
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="date"
          name="CreationDate"
          value={formik.values.CreationDate}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.CreationDate && formik.errors.CreationDate
            ? formik.errors.CreationDate
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="description">
          Description
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="description"
          rows="4"
          value={formik.values.description}
          onChange={formik.handleChange}
        ></input>
        <h1 className="text-red-400">
          {formik.touched.description && formik.errors.description
            ? formik.errors.description
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="challenges">
          Challenges
        </label>
        <textarea
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="challenges"
          rows="4"
          value={formik.values.challenges}
          onChange={formik.handleChange}
        ></textarea>
        <h1 className="text-red-400">
          {formik.touched.challenges && formik.errors.challenges
            ? formik.errors.challenges
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="solution">
          Solution
        </label>
        <textarea
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="solution"
          rows="4"
          value={formik.values.solution}
          onChange={formik.handleChange}
        ></textarea>
        <h1 className="text-red-400">
          {formik.touched.solution && formik.errors.solution
            ? formik.errors.solution
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl" htmlFor="documentation">
          Project Documentation
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          onChange={handleDoc}
          type="file"
          id="formupload"
          name="documentation"
        />
        {/* <h1 className="text-red-400">
          {formik.touched.documentation && formik.errors.documentation ? formik.errors.documentation : ""}
        </h1> */}
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button
        className={`flex justify-center py-2 text-lg font-semibold rounded-md z-10 ${
          darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-300 text-gray-700"
        }`}
        type="submit"
        disabled={addProject.isLoading}
      >
        {addProject.isLoading ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
};

export default AddProject;
