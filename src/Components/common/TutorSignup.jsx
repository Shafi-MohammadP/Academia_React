import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { commonSignupurl } from "../../Constants/Constants";
import { SignupValidationSchema } from "../../formvalidation/Signupvalidation";
import { Loader } from "../Loader/Loader";

const TutorSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const initialState = {
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "tutor",
  };
  const { handleSubmit, handleChange, handleBlur, errors, touched, values } =
    useFormik({
      initialValues: initialState,
      validationSchema: SignupValidationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        console.log(values, "pppppppppppppppppppppppppppppppppppppp");
        try {
          const responsedata = await axios.post(commonSignupurl, values);
          const response = responsedata.data;
          console.log(
            response,
            "responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
          );
          if (response.status === 200) {
            toast.success(response.Text);
            navigate("/emailcheck/");
          } else if (response.status === 400) {
            toast.error(response.Text);
            navigate("/tutor/signup/");
          } else {
            console.log(
              responsedata,
              "else errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrorrrrr"
            );
          }
        } catch (error) {
          console.error("Erroun found during signup", error);
        } finally {
          setLoading(false);
        }
      },
    });

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
            <div className="flex flex-col text-white py-2">
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
            <div className="flex flex-col text-white py-2">
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
            <div className="flex flex-col text-white py-2">
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
              <Link to={"/student/signup/"}>
                <p className="text-orange-800">Sign Up As a Student</p>{" "}
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

export default TutorSignup;
