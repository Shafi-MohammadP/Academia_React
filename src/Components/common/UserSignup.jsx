import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { commonSignupurl } from "../../Constants/Constants";
import axios from "axios";
import toast from "react-hot-toast";
import { SignupValidationSchema } from "../../formvalidation/Signupvalidation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setUseremail } from "../../redux/Email";
import { Loader } from "../Loader/Loader";

const userSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cl = console.log.bind(console);
  const [loading, setLoading] = useState(false);
  const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "student",
  };
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: initialState,
      validationSchema: SignupValidationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          console.log(
            values,
            "valueeeeeeeeeeeeeeeeeeeeeeeeeeeesssssssssssssssssssss"
          );
          const responseData = await axios.post(commonSignupurl, values);
          const response = responseData.data;
          console.log(response, "oooooooooooooooo");
          console.log(responseData.data, "iiiiiiiiiiiiiiiiiiiiiiiiii");
          if (response.status === 200) {
            const setEmail = {
              email: values.email,
            };
            dispatch(setUseremail(setEmail));
            toast.success(response.Text);
            navigate("/emailcheck/");
          } else if (response.status === 400) {
            toast.error(response.Text);
          }
        } catch (error) {
          console.error("Errro during Sign up", error);
          toast.error(error);
        } finally {
          setLoading(false);
        }
      },
    });
  //   const handleuserSignup = async (e) => {
  //     e.preventDefault();
  //     const student = {
  //       username: e.target.username.value,
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //       password2: e.target.password2.value,
  //       role: e.target.role.value,
  //     };
  //     console.log("student data", student);
  //     const validateForm = () => {
  //       if (student.username.trim() === "") {
  //         toast.error("Username is empty");
  //         return false;
  //       } else if (student.email.trim() === "") {
  //         toast.error("Email is Empty");
  //         return false;
  //       } else if (student.password.trim() === "") {
  //         toast.error("passowrd is empty");
  //         return false;
  //       } else if (student.password2.trim() === "") {
  //         toast.error("passowrd is empty");
  //         return false;
  //       } else if (student.password < 8) {
  //         toast.error("password atleast need minimum 8 character");
  //         return false;
  //       } else if (student.password != student.password2) {
  //         toast.error("passowrd doesn't match");
  //         return false;
  //       }
  //       return true;
  //     };

  //     if (validateForm()) {
  //       try {
  //         const resposeData = await axios.post(studentSugnupUrl, student);
  //         const response = resposeData.data;
  //         console.log(
  //           response,
  //           "responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
  //         );
  //         console.log(
  //           resposeData,
  //           "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  //         );
  //         if (response.status === 200) {
  //           toast.success("Accoun created succesfully");
  //         } else if (response.status === 400) {
  //           toast.error(resposeData.data[0]);
  //         }
  //       } catch (error) {
  //         console.error("error during signup", error);
  //         toast.error("Error", error);
  //       }
  //     }
  //   };
  return (
    <>
      {loading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/000/460/211/original/vector-e-learning-concept-flat.jpg"
            alt="image"
          />
        </div>
        <div className="bg-gray-400 flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto bg-blue-gray-900 p-8 px-8 rounded-lg"
            onSubmit={handleSubmit}
          >
            <h2 className="text text-4x text-white font-bold text-center">
              SIGN UP
            </h2>
            <div className="flex flex-col text-white py-2">
              <label htmlFor="">Username</label>
              <input
                className="rounded-lg bg-black mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                onChange={handleChange}
                value={values.username}
                onBlur={handleBlur}
                type="text"
                name="username"
                placeholder="username"
              />
              {errors.username && touched.username && (
                <span className="font-light  text-red-500">
                  {errors.email}s
                </span>
              )}
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="">Email</label>
              <input
                className="rounded-lg bg-black mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                type="email"
                name="email"
                placeholder="Enter your Email"
              />
              {errors.email && touched.email && (
                <span className="font-light  text-red-500">{errors.email}</span>
              )}
            </div>
            <input type="hidden" name="role" value={"student"} />
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="">Password</label>
              <input
                className="rounded-lg bg-black mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                type="password"
                name="password"
                placeholder="Password"
              />
              {errors.password && touched.password && (
                <span className="font-light  text-red-500">
                  {errors.password}
                </span>
              )}
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label htmlFor="">Confirm Password</label>
              <input
                className="rounded-lg bg-black mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                onChange={handleChange}
                value={values.password2}
                onBlur={handleBlur}
                type="password"
                name="password2"
                placeholder="Confirm Pasword"
              />
              {errors.password2 && touched.password2 && (
                <span className="font-light  text-red-500">
                  {errors.password2}
                </span>
              )}
            </div>
            <div>
              <Link to={"/tutor/signup/"}>
                <p className="text-orange-800">Sign Up As a Tutor</p>{" "}
              </Link>
            </div>
            <button
              type="submit"
              className="w-full my-5 py-2 bg-orange-500 shadow-orange-500/50 hover:shadow-orange-500/30 text-white font-semibold rounded-lg"
            >
              Sign In
            </button>
            <div>
              <p className="text-white">
                Already Have Account?
                <Link to={"/Login"}>
                  {" "}
                  <span className="font-semibold text-orange-700">SIGN IN</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default userSignUp;
