import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const apiUrl = "http://127.0.0.1:8000/api";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${apiUrl}/login`, {
          email: values.email,
          password: values.password,
        });

        const { token } = response.data;
        setAuthToken(token);  
        localStorage.setItem("authToken", token); 

        if (!toast.isActive(13)) {
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
          });
        }

        navigate("/"); 
      } catch (error) {
        if (!toast.isActive(13)) {
          toast.error("Login failed. Please check your credentials.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="/imgs/main_logo.58c7ac2.svg"
            alt="WindshieldHub Logo"
            className="logo"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <ToastContainer containerId={"alert"} />
      </div>
    </div>
  );
};

export default SignIn;
