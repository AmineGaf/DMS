import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "../assets/background.jpg";

const ForgetPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/api/forgetPassword", values)
        .then((response) => {
          if (response.status === 200) {
            setIsEmailSent(true);
          } else {
            setIsEmailSent(false);
            toast.error("Failed to send email");
          }
        })
        .catch((error) => {
          setIsEmailSent(false);
          if (error.response && error.response.status === 500) {
            formik.setFieldError("email", "User not found");
          } else {
            toast.error("Server error");
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
        <h1 className="font-bold text-blue-900">Email</h1>
        <input
          type="text"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className={`p-2 rounded-md border ${
            formik.errors.email && formik.touched.email
              ? "border-red-500"
              : "border-blue-300"
          } bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500">{formik.errors.email}</div>
        )}
        <button
          className="w-full bg-gradient-to-r from-blue-700 to-cyan-300 rounded-md p-2 text-blue-200 text-xl font-bold 
              transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-70"
          type="submit"
        >
          Send Reset mail
        </button>
        {isEmailSent && (
          <div className="text-blue-700">
            An email has been sent for password reset.
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgetPassword;