import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { ThemeContext } from "../../../contexts/ThemeContext";

const AddTask = ({userId}) => {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { darkMode } = useContext(ThemeContext);


  const addTask = useMutation(
    
    async (values) => {
      const response = await axios.post(
        "http://localhost:3000/api/task/addTask",
        { ...values, userId}
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
      TaskName: "",
      ProjectName: "",
      Status: "",
      ResponsibleUser: "",
      DueDate: "",
      TaskDetails: [
        {
          detailName: "",
          detailStatus: "",
          detailestimationDate: "",
          detailDescription: "",
        },
      ],
    },
    validationSchema: Yup.object({
      TaskName: Yup.string().required("TaskName is required"),
      ProjectName: Yup.string().required("ProjectName is required"),
      Status: Yup.string().required("Status is required"),
      ResponsibleUser: Yup.string().required("ResponsibleUser is required"),
      DueDate: Yup.date().required("DueDate is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      addTask.mutate(values);
      resetForm();
    },
  });

  const handleDetailNameChange = (index, event) => {
    const newDetails = [...formik.values.TaskDetails];
    newDetails[index].detailName = event.target.value;
    formik.setFieldValue("TaskDetails", newDetails);
  };

  const handleDetailStatusChange = (index, event) => {
    const newDetails = [...formik.values.TaskDetails];
    newDetails[index].detailStatus = event.target.value;
    formik.setFieldValue("TaskDetails", newDetails);
  };

  const handleDetailDateChange = (index, event) => {
    const newDetails = [...formik.values.TaskDetails];
    newDetails[index].detailestimationDate = event.target.value;
    formik.setFieldValue("TaskDetails", newDetails);
  };

  const handleDetailDescription = (index, event) => {
    const newDetails = [...formik.values.TaskDetails];
    newDetails[index].detailDescription = event.target.value;
    formik.setFieldValue("TaskDetails", newDetails);
  };

  const addTaskDetail = () => {
    const newDetails = [
      ...formik.values.TaskDetails,
      { detailName: "", detailStatus: "",detailDescription:"", detailestimationDate:""  },
    ];
    formik.setFieldValue("TaskDetails", newDetails);
  };

  const removeTask = (index) => {
    const newDetails = [...formik.values.TaskDetails];
    newDetails.splice(index, 1);
    formik.setFieldValue("TaskDetails", newDetails);
  };

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
      <div className="flex flex-col gap-2">
        <label htmlFor="TaskDetails" className="text-xl">
          Task Details
        </label>
        {formik.values.TaskDetails.map((task, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex flex-col gap-2">
              <input
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                type="text"
                placeholder="Task Name"
                value={task.detailName}
                onChange={(event) => handleDetailNameChange(index, event)}
              />
              <select
                className="bg-input py-2 rounded-md"
                name=""
                id=""
                value={task.detailStatus}
                onChange={(event) => handleDetailStatusChange(index, event)}
              >
                <option value="">status</option>
                <option value="notStarted">Not Started</option>
                <option value="inProgress">In progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <input
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                type="date"
                value={task.detailestimationDate}
                onChange={(event) => handleDetailDateChange(index, event)}
              />
              <textarea
                rows={2}
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                value={task.detailDescription}
                onChange={(event) => handleDetailDescription(index, event)}
              />
            </div>

            {formik.values.TaskDetails.length > 1 && (
              <button
                type="button"
                onClick={() => removeTask(index)}
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-input `}
              >
                -
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addTaskDetail}
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            darkMode ? "bg-gray-900 text-gray-400" : "bg-gray-200 text-gray-600"
          }`}
        >
          +
        </button>
      </div>

      <div className="flex gap-2 ">
        <button
          type="submit"
          className={`btn p-2 rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 w-40 opacity-90`}
          disabled={addTask.isLoading}
        >
          {addTask.isLoading ? "Adding..." : "Add task"}
        </button>
        <button
          type="button"
          onClick={() => document.getElementById("addTask").close()}
          className={`btn  p-2 rounded-md w-40 opacity-90`}
        >
          Cancel
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default AddTask;
