import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import background from "../assets/background.jpg";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
        const { newPassword } = values;
        const token = window.location.pathname.split("/").pop();
      
        axios
          .post(`http://localhost:3000/api/reset-password/${token}`, { newPassword })
          .then((response) => {
            toast.success(response.data.message);
            setTimeout(() => {
              window.location.href = "/login";
            }, 3000);
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              toast.error(error.response.data.error);
            } else {
              toast.error("Your link has expired");
            }
          });
      },
  });

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="flex flex-col items-center px-6 bg-cover h-screen md:justify-center md:gap-[20px]"
    >
      <form
        className="bg-blue-200 p-20  flex flex-col gap-7 rounded-md text-xl"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col gap-3">
  <h1 className="font-bold text-blue-900">New Password</h1>
  <input
    type="password"
    name="newPassword"
    value={formik.values.newPassword}
    onChange={formik.handleChange}
    className={`p-2 rounded-md border ${
      formik.errors.newPassword && formik.touched.newPassword
        ? "border-red-500"
        : "border-blue-300"
    } bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  />
  {formik.errors.newPassword && formik.touched.newPassword && (
    <div className="text-red-500">{formik.errors.newPassword}</div>
  )}
</div>
<div className="flex flex-col gap-3">
  <h1 className="font-bold text-blue-900">Confirm Password</h1>
  <input
    type="password"
    name="confirmPassword"
    value={formik.values.confirmPassword}
    onChange={formik.handleChange}
    className={`p-2 rounded-md border ${
      formik.errors.confirmPassword && formik.touched.confirmPassword
        ? "border-red-500"
        : "border-blue-300"
    } bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  />
  {formik.errors.confirmPassword && formik.touched.confirmPassword && (
    <div className="text-red-500">{formik.errors.confirmPassword}</div>
  )}
</div>
        
        <button
          className="w-full bg-gradient-to-r from-blue-700 to-cyan-300 rounded-md p-2 text-blue-200 text-xl font-bold 
              transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-70"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;