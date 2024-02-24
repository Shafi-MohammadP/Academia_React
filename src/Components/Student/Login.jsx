import React, { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { loginUrl } from "../../Constants/Constants";
import toast, { Toaster } from "react-hot-toast";
import { setUserDetails } from "../../redux/User";
import { useDispatch } from "react-redux";

export function Login() {
  const dispatch = useDispatch();
  const [showSignUpOptions, setShowSignUpOptions] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUpOptions(!showSignUpOptions); // Toggle the state
  };
  const navigate = useNavigate();
  const handleOptionClick = (role) => {
    console.log(role, "-------------------------->>");
    if (role === "student") {
      navigate("/signup");
    }
    // Implement the logic based on the selected role
    // You can navigate to another page or perform further actions here
  };
  const loginuser = async (e) => {
    e.preventDefault();

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
        console.log(token, "-------------------------->>>>");
        localStorage.setItem("authToken", JSON.stringify(data));
        const setuser = {
          user_id: token.user_id,
          name: token.first_name + " " + token.last_name,
          email: token.email,
          is_admin: token.is_admin,
          role: token.role,
        };
        dispatch(setUserDetails(setuser));
        if (token.is_admin && token.is_active) {
          console.log("admin");
          navigate("/tutor");
        } else {
          console.log("Condition False");
          navigate("/");
        }
      } else if (response.status === 401) {
        Swal.fire({
          title: "Error",
          text: "User credentials mismatch",
          icon: "error",
        });
        navigate("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: "Network error!",
          icon: "error",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center mt-10 bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage:
          'url("https://www.shiftelearning.com/hs-fs/hubfs/3013.jpg?width=8994&name=3013.jpg")',
        backgroundSize: "cover",
        height: "650px", // Adjust the height as needed
      }}
    >
      <div className="p-8 max-w-lg" style={{ width: "500px" }}>
        <Card color="lightBlue" shadow={false} className="bg-white p-10">
          <Typography variant="h4" color="blue-gray" className="text-center">
            {showSignUpOptions ? "Choose" : "Login"}
          </Typography>
          {showSignUpOptions ? (
            <div className="flex flex-col">
              <Button
                color="blue"
                onClick={() => handleOptionClick("student")}
                className="mb-4"
              >
                Sign Up as Student
              </Button>

              <Button color="green" onClick={() => handleOptionClick("tutor")}>
                Sign Up as Tutor
              </Button>
            </div>
          ) : (
            <form className="mt-8" onSubmit={(e) => loginuser(e)}>
              {/* Email and password input fields */}
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray">
                  Your Email
                </Typography>
                <Input
                  type="email"
                  name="email"
                  size="lg"
                  placeholder="name@mail.com"
                  className="!border-t-black-900 focus:!border-t-black-900"
                />
              </div>
              <div className="mb-4">
                <Typography variant="h6" color="blue-gray">
                  Password
                </Typography>
                <Input
                  type="password"
                  name="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                />
              </div>
              {/* Conditional rendering for SignUp options */}
              <Button
                type="submit"
                style={{ backgroundColor: "#10BB9D" }}
                className="w-full"
              >
                Submit
              </Button>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Don't have an account?{" "}
                <span
                  className="font-medium text-gray-900 cursor-pointer"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </span>
              </Typography>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
