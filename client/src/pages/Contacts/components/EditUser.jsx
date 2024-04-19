import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as Yup from "yup";
import { ThemeContext } from "../../../contexts/ThemeContext";

const EditUser = ({ user }) => {
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { darkMode } = useContext(ThemeContext);

  const editUser = useMutation(
    async (values) => {
      const response = await axios.patch(
        `http://localhost:3000/api/user/update/${user._id}`,
        values
      );
      return response.data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("users");
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      startDate: user.startDate,
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("fullname is required"),
      email: Yup.string()
        .email("Invalid email adress")
        .required("Email is required"),
      role: Yup.string().required("Role is required"),
      phoneNumber: Yup.number()
        .required("Phone number is required")
        .min(10000000, "Phone number must be 8 digits")
        .max(99999999, "Phone number must be 8 digits"),
      startDate: Yup.date().required("Date is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      editUser.mutate(values);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="fullname">
          Fullname
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="fullname"
          placeholder="...Amine Gafsi"
          value={formik.values.fullname}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.fullname && formik.errors.fullname
            ? formik.errors.fullname
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="email">
          Email
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="email"
          placeholder="...amine@gmail.com"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.email && formik.errors.email
            ? formik.errors.email
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="role">
          Role
        </label>
        <select
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <option>Select a role</option>
          <option>Project Manager</option>
          <option>employee</option>
        </select>
        <h1 className="text-red-400">
          {formik.touched.role && formik.errors.role ? formik.errors.role : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="phoneNumber">
          Phone number
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="text"
          name="phoneNumber"
          placeholder="...12345678"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.phoneNumber && formik.errors.phoneNumber
            ? formik.errors.phoneNumber
            : ""}
        </h1>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xl " htmlFor="startDate">
          Date of start
        </label>
        <input
          className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
          type="date"
          name="startDate"
          value={formik.values.startDate}
          onChange={formik.handleChange}
        />
        <h1 className="text-red-400">
          {formik.touched.startDate && formik.errors.startDate
            ? formik.errors.startDate
            : ""}
        </h1>
      </div>
      
      <div className="flex gap-2 ">
        <button
          type="submit"
          className={`btn p-2 rounded-md bg-blue-600 hover:bg-blue-500 text-gray-200 w-40 opacity-90`}
          disabled={editUser.isLoading}
        >
          {editUser.isLoading ? "Editing..." : "Edit User"}
        </button>
        <button
          type="button"
          onClick={() => document.getElementById("editUser").close()}
          className={`btn  p-2 rounded-md w-40 opacity-90`}
        >
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default EditUser;
