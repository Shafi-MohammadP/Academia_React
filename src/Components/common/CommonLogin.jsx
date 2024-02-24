import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { loginUrl, GoogleLoginUrl, BaseUrl } from "../../Constants/Constants";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/User";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import axios from "axios";
import { Loader } from "../Loader/Loader";

const CommonLogin = () => {
  const [guser, setGuser] = useState();
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((cur) => !cur);
  const navigate = useNavigate();
  const cl = console.log.bind(console);
  const [showSignUpOptions, setShowSignUpOptions] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const message = queryParams.get("message");

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
  }, [message]);
  useEffect(() => {
    const googleAuth = async () => {
      try {
        if (!guser) return;
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token= ${guser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${guser.access_token}`,
              Accept: "application/json",
            },
          }
        );
        const googleuser = {
          email: response.data.email,
          username: response.data.name,
          password: response.data.id,
        };
        try {
          const backendresponse = await axios.post(GoogleLoginUrl, googleuser);
          const res = backendresponse.data;
          const token = jwtDecode(res.token.access_token);
          console.log(token, "gfdgfdgfdgfdg");
          if (res.status === 200) {
            localStorage.setItem("authToken", JSON.stringify(res.token));
            const userSet = {
              user_id: token.user_id,
              name: token.username,
              email: token.email,
              is_admin: token.is_admin,
              role: token.role,
            };
            dispatch(setUserDetails(userSet));
            if (token.role === "student") {
              navigate("/");
              toast.success(res.Text);
            } else if (token.role === "admin") {
              navigate("/admin/");
              toast.success(res.Text);
            } else if (token.role === "tutor") {
              navigate("/tutor/");
              toast.success(res.Text);
            }
          }
        } catch (error) {
          cl("Error During Loginnnnnnn", error);
        }
      } catch (error) {
        console.log(error, "Error found during Gooogle Login");
      }
    };
    if (guser) {
      googleAuth();
    }
  }, [guser]);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGuser(codeResponse);
    },
    onError: (error) => {
      toast.error(error);
      console.log(error, "this is the error");
    },
  });
  const handleSignupoption = () => {
    setShowSignUpOptions(!showSignUpOptions);
  };
  const handleOptionClick = (role) => {
    if (role === "student") {
      console.log(role);
      navigate("/student/signup/");
    } else {
      navigate("/tutor/signup/");
    }
  };
  const Loginuser = async (e) => {
    e.preventDefault();
    handleLoading();
    try {
      const response = await fetch(`${loginUrl}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      });
      if (response.status === 200) {
        const data = await response.json();
        const token = jwtDecode(data.access);
        localStorage.setItem("authToken", JSON.stringify(data));
        let apiUrl = null;
        if (token.role === "tutor") {
          apiUrl = `${BaseUrl}tutor/TutorProfileShow/${token.user_id}`;
        } else if (token.role === "student") {
          apiUrl = `${BaseUrl}student/StudentProfileShow/${token.user_id}`;
        } else if (token.role === "admin") {
          const setAdmin = {
            user_id: token.user_id,
            name: token.username,
            email: token.email,
            is_admin: token.is_admin,
            role: token.role,
          };
          dispatch(setUserDetails(setAdmin));
          navigate("/admin/");
          toast.success("Login Successful", {
            duration: 1000,
          });
          return;
        } else {
          console.log("unAuthorized person");
        }
        let result = null;
        try {
          result = await axios.get(apiUrl);
        } catch (err) {
          console.log(err, "error");
        }
        if (result.data.status === 200) {
          const setuser = {
            user_id: token.user_id,
            name: token.username,
            email: token.email,
            is_admin: token.is_admin,
            role: token.role,
            id: result.data.data,
          };
          dispatch(setUserDetails(setuser));

          if (token.is_admin && token.is_active) {
            navigate("/admin/");
            toast.success("Login Succesfull", {
              duration: 1000,
            });
          } else if (token.role === "student") {
            navigate("/");
            toast.success("Logined succesfully");
          } else {
            navigate("/tutor");
            toast.success("Logined succesfully");
          }
        } else {
          console.log("Profile fetched wrong");
        }
      } else if (response.status === 401) {
        toast.error("Credential mismatch");
        navigate("/Login");
      } else {
        toast.error("Network Error");
      }
    } catch (error) {
      toast.error("Error During Login", error);
      console.log(error, "new Error");
    } finally {
      handleLoading();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="hidden sm:block">
          <img
            className="w-full h-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/000/460/211/original/vector-e-learning-concept-flat.jpg"
            alt=""
          />
        </div>
        <div className="bg-gray-400 flex flex-col justify-center">
          <form
            className="max-w-[400px] w-full mx-auto bg-blue-gray-900 p-8 px-8 rounded-lg"
            onSubmit={(e) => Loginuser(e)}
          >
            <h2 className="text-4x text-white font-bold text-center">
              {" "}
              {showSignUpOptions ? "CHOOSE" : "LOG IN"}
            </h2>

            {showSignUpOptions ? (
              <div className="flex flex-col">
                <Button
                  color="blue"
                  onClick={() => handleOptionClick("student")}
                  className="mb-4"
                >
                  Sign Up as Student
                </Button>

                <Button
                  color="green"
                  onClick={() => handleOptionClick("tutor")}
                >
                  Sign Up as Tutor
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col text-white py-2">
                  <label htmlFor="">Email</label>
                  <input
                    className="rounded-lg bg-black mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="flex flex-col text-white py-2">
                  <label htmlFor="">Password</label>
                  <input
                    className="rounded-lg bg-black mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                </div>
                <div>
                  <p>{/* <input type="checkbox" /> Remeber Me */}</p>
                </div>

                <button
                  type="submit"
                  className="w-full my-5 py-2 bg-orange-500 shadow-orange-500/50 hover:shadow-orange-500/30 text-white font-semibold rounded-lg"
                >
                  Log In
                </button>

                <div className="my-5">
                  <GoogleButton
                    onClick={() => loginWithGoogle()}
                    // className="py-2 bg-orange-500 shadow-orange-500/50 hover:shadow-orange-500/30 text-white font-semibold rounded-lg"
                    style={{ width: "100%", height: "100%" }}
                  >
                    Log In with Google
                  </GoogleButton>
                </div>

                <div>
                  <p className="text-white">
                    No Account?
                    <Link>
                      <span
                        className="font-semibold text-orange-700"
                        onClick={handleSignupoption}
                      >
                        CREATE ONE
                      </span>
                    </Link>
                  </p>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CommonLogin;
