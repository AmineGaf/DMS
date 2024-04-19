import background from './assets/background.jpg';
import login from './assets/lotties/login';
import Lottie from 'react-lottie'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import React,{ useState } from 'react';
import { AuthContext } from './contexts/AuthContext';


const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [err, setErr] = useState('');
  const Navigate = useNavigate();
  const { dispatch } = React.useContext(AuthContext);


  const defaultOptions  = {
    loop: true,
      autoplay: true,
      animationData: login
    };
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password:""
    },

    validationSchema: Yup.object({
      email: Yup.string()
      .email('Invalid email adresse')
      .required('Email is required'),
      password: Yup.string()
      .required('Password is required')
    }),
    onSubmit: async (values) => {
      try{
        const response = await axios.post('http://localhost:3000/api/login', values);
        if (response.status === 200 && response.data){
          dispatch({ type: 'LOGIN', payload: response.data});
          Navigate('/');
        }
      }catch(error){
          handleLogin(error);
      }
    },
  });

  const handleLogin = (error) => {
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      setErr(errorMessage);
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
  };

  return (
    <div 
    style={{ backgroundImage: `url(${background})` }}
    className="flex items-center px-6 bg-cover h-screen md:justify-center md:gap-[100px] text-black" >
      <div className="hidden md:flex opacity-80 ">
        <Lottie 
          options={defaultOptions}
        />
      </div>
      <div className="flex flex-col bg-blue-200 rounded-xl justify-center items-center p-20 gap-12 md:w-[700px] shadow-lg">
        <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <form 
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-5 text-lg">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold text-blue-900">
              Email
            </label>
            <input
              className="p-2 rounded-md border bg-blue-100 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="email"
              placeholder="Enter Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              
            />
            <h1 className='text-red-400'>
              {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold text-blue-900">
              Password
            </label>
            <input
              className="p-2 rounded-md border bg-blue-100 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <h1 className='text-red-400'>
              {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
            </h1>
          </div>
          <div className=''>
            <button
              className="w-full bg-gradient-to-r from-blue-700 to-cyan-300 rounded-md p-2 text-blue-100 text-xl font-bold 
              transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-70
              "
              type="submit"
            >
              Sign in
            </button>
          </div>
          {isVisible && <div className='text-red-500'>{err}</div>}
          <div className="text-blue-900">
            <p className="text-center">
              Forgot your password?{" "}
              <Link to="/forget-password" className="cursor-pointer underline hover:text-cyan-500 duration-150">Reset password here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;