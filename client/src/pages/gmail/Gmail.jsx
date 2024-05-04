import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Gmail = () => {
  const formik = useFormik({
    initialValues: {
      to: "",
      subject: "",
      text: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/sendEmail",
          values
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center items-center gap-10">
      <div className="flex gap-6">
        <label htmlFor="to">To :</label>
        <input
          type="text"
          name="to"
          placeholder="enter receiver email"
          value={formik.values.to}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex gap-6">
        <label htmlFor="subject">Subject :</label>
        <input
          type="text"
          name="subject"
          placeholder="enter subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
        />
      </div>
      <div className="flex gap-6">
        <label htmlFor="text">Text :</label>
        <input
          type="text"
          name="text"
          placeholder="enter text"
          value={formik.values.text}
          onChange={formik.handleChange}
        />
      </div>
      <button type="submit" className="bg-primary text-primary-foreground p-2 rounded-md">Send Mail</button>
    </form>
  );
};

export default Gmail;
