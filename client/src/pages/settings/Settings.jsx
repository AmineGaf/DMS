import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  
  const user = useLocation().state.user;


  const [error, setError] = useState(null);
  const [imageUser, setImageUser] = useState([]);
  const [resumeUser, setResumeUser] = useState([]);
  const [contractUser, setContractUser] = useState([]);
  const queryClient = useQueryClient();

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
      image: user.image,
      role: user.role,
      phoneNumber: user.phoneNumber,
      startDate: user.startDate,
      description: user.description,
      resume: user.resume,
      contract: user.contract,
    },
    validationSchema: Yup.object({
      fullname: Yup.string(),
      email: Yup.string()
        .email("Invalid email adress"),
      role: Yup.string(),
      phoneNumber: Yup.number()
        .min(10000000, "Phone number must be 8 digits")
        .max(99999999, "Phone number must be 8 digits"),
      startDate: Yup.date(),
    }),
    onSubmit: (values, { resetForm }) => {
      values.image = imageUser;
      values.resume = resumeUser;
      values.contract = contractUser;
      editUser.mutate(values);
      resetForm();
    },
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUser(reader.result);
    };
  };

  const handleResume = (e) => {
    const file = e.target.files[0];
    setResumeToBase(file);
  };

  const setResumeToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setResumeUser(reader.result);
    };
  };

  const handleContract = (e) => {
    const file = e.target.files[0];
    setContractToBase(file);
  };

  const setContractToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setContractUser(reader.result);
    };
  };

  return (
    <div className="flex flex-col p-4 gap-3">
      <h1 className="text-2xl">
        <span className="text-primary">{user.fullname}</span> settings
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-primary-foreground flex flex-col p-5 gap-2 rounded-md justify-center items-center "
      >
        <div className=" rounded-md p-5 flex justify-center items-center gap-[50px] ">
          <div className="flex flex-col gap-4">
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
              <label className="text-xl" htmlFor="image">
                User Image
              </label>
              <input
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                onChange={handleImage}
                type="file"
                id="formupload"
                name="image"
              />
              {/* <h1 className="text-red-400">
          {formik.touched.image && formik.errors.image ? formik.errors.image : ""}
        </h1> */}
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
                {formik.touched.role && formik.errors.role
                  ? formik.errors.role
                  : ""}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl " htmlFor="description">
                Description
              </label>
              <textarea
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              <h1 className="text-red-400">
                {formik.touched.description && formik.errors.description
                  ? formik.errors.description
                  : ""}
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-l-2 border-dashed pl-20  ">
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
            <div className="flex flex-col gap-2">
              <label className="text-xl " htmlFor="password">
                Password
              </label>
              <input
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                type="password"
                name="password"
                placeholder="***********"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <h1 className="text-red-400">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </h1>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl" htmlFor="resume">
                User resume
              </label>
              <input
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                onChange={handleResume}
                type="file"
                id="formupload"
                name="resume"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xl" htmlFor="contract">
                User contract
              </label>
              <input
                className={`flex w-full p-2 rounded-md bg-input border-border text-foreground`}
                onChange={handleContract}
                type="file"
                id="formupload"
                name="contract"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2 ">
          <button
            type="submit"
            className={`btn p-2 rounded-md bg-blue-600 hover:bg-blue-500 text-foreground w-[200px] opacity-90 `}
            disabled={editUser.isLoading}
          >
            {editUser.isLoading ? "Editing..." : "Edit User"}
          </button>
        </div>

        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default Settings;
