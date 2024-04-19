import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { ThemeContext } from "../../../contexts/ThemeContext";

const EditTask = ({task}) => {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { darkMode } = useContext(ThemeContext);

  const editTask = useMutation(
    async (values) => {
      const response = await axios.patch(
        `http://localhost:3000/api/task/updatetask/${task._id}`,
        values
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("tasks");
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      TaskName: task.TaskName,
      ProjectName: task.ProjectName,
      Status: task.Status,
      ResponsibleUser: task.ResponsibleUser,
      DueDate: task.DueDate,
    },
    validationSchema: Yup.object({
      TaskName: Yup.string().required("TaskName is required"),
      ProjectName: Yup.string().required("ProjectName is required"),
      Status: Yup.string().required("Status is required"),
      ResponsibleUser: Yup.string().required("ResponsibleUser is required"),
      DueDate: Yup.date().required("DueDate is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      editTask.mutate(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="TaskName">
          Task Name
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="TaskName"
          placeholder="...Dashboard"
          value={formik.values.TaskName}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.TaskName && formik.errors.TaskName
            ? formik.errors.TaskName
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="ProjectName">
          Project Name
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="ProjectName"
          placeholder="...Project Management"
          value={formik.values.ProjectName}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.ProjectName && formik.errors.ProjectName
            ? formik.errors.ProjectName
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="Status">
          Status
        </label>
        <select
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          name="Status"
          value={formik.values.Status}
          onChange={formik.handleChange}
        >
          <option>Select a Status</option>
          <option>Not Started</option>
          <option>In progress</option>
          <option>Completed</option>
        </select>
        <h1 className="text-red-400">
          {formik.touched.Status && formik.errors.Status
            ? formik.errors.Status
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="ResponsibleUser">
          ResponsibleUser
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="ResponsibleUser"
          placeholder="...Amir Gafsi"
          value={formik.values.ResponsibleUser}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.ResponsibleUser && formik.errors.ResponsibleUser
            ? formik.errors.ResponsibleUser
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="DueDate">
          Due Date
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="date"
          name="DueDate"
          value={formik.values.DueDate}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.DueDate && formik.errors.DueDate
            ? formik.errors.DueDate
            : ""}
        </h1>
      </div>

      <div className="flex gap-2 ">
        <button
          type="submit"
          className={`btn p-2 rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 w-40 opacity-90`}
          disabled={editTask.isLoading}
        >
          {editTask.isLoading ? "Editing..." : "Edit task"}
        </button>
        <button
          type="button"
          onClick={() => document.getElementById("editTask").close()}
          className={`btn  p-2 rounded-md w-40 opacity-90`}
        >
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default EditTask;
