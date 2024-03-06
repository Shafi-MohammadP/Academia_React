import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import { Container, Row } from "reactstrap";
import toast from "react-hot-toast";
import { Loader } from "../../Loader/Loader";

function ResetPassword() {
  const user = useSelector((state) => state.user.userInfo);
  console.log(user, "user");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleOnChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // focus nxt input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleVerifyOtp = async () => {
    // Check if all elements in OTP are numbers
    if (!otp.every((digit) => /^\d$/.test(digit))) {
      toast.error("Invalid OTP format");
      return;
    }

    // Check if any element in OTP is empty
    if (otp.some((digit) => !digit.trim())) {
      toast.error("OTP cannot contain empty digits");
      return;
    }

    const apiUrl = `${BaseUrl}user/reset_password_otp_verify/`;
    const data = {
      email: user.email,
      otp: otp,
    };
    console.log(data, "data");
    try {
      const response = await axios.patch(apiUrl, data);
      console.log(response.status, "response object"); // Log the complete response object

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsOtpVerified(true);
      } else if (response.status === 203) {
        toast.error(response.data.error);
      } else {
        toast.error("Something went wrong");
        console.log(response.status, "response");
      }
    } catch (err) {
      toast.error(err.response.data.error);
      console.log(err, "error in OTP verifying");
    }
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~])/;
    const isValidPassword = passwordRegex.test(newPassword);
    if (!isValidPassword) {
      toast.error(
        "Password should contain one alphabet, number and a special character"
      );
      setLoading(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password is not matched");
      setLoading(false);
      return;
    }

    try {
      const data = {
        password: newPassword,
        confirmPassword: confirmPassword,
      };
      const apiUrl = `${BaseUrl}user/password_change/${user.user_id}/`;
      const response = await axios.patch(apiUrl, data);
      if (response.status === 200) {
        if (user.role === "student") {
          navigate("/studentprofile");
        } else {
          navigate("/tutor/tutorprofile");
        }
        toast.success("Password changed successfully");
      } else if (response.status >= 400) {
        toast.err(response.data.error);
      }
    } catch (err) {
      console.error(err, "error in schema password change");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section>
        <Container>
          <Row>
            {/* OTP Verification Column */}
            {/* <Col md={6}> */}
            {!isOtpVerified && (
              <>
                <h2 className="text-center">OTP Verification</h2>
                <p className="txt text-center">
                  We have sent an OTP to your email address
                </p>
                <div className="py-3 flex justify-center items-center gap-1.5">
                  {otp.map((data, index) => (
                    <input
                      type="text"
                      name={`num${index + 1}`}
                      maxLength="1"
                      className="border border-gray-300 p-2.5 text-[14px] w-[30px] h-[30px] rounded-md outline-none shadow-md"
                      value={data}
                      key={index}
                      onChange={(e) => handleOnChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>
                <div className="flex justify-center flex-col items-center">
                  <div className="flex-col">
                    <p>Entered OTP - {otp.join("")}</p>
                  </div>
                  <div className="flex gap-11">
                    <button
                      className="btn"
                      onClick={() => setOtp(new Array(6).fill(""))}
                    >
                      Clear All
                    </button>
                    <button
                      className="btn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleVerifyOtp();
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>{" "}
              </>
            )}
            {/* </Col> */}

            {/* New Password Column (Conditionally Rendered) */}
            {isOtpVerified && (
              <>
                <div className="flex flex-col justify-center items-center">
                  <h2 className="text-center mb-4">Enter New Password</h2>

                  <div className="py-2 gap-4 flex flex-col items-center">
                    <input
                      type="text"
                      placeholder="Enter New password"
                      name="newPassword"
                      className="border border-black p-2 text-sm w-80 rounded-md outline-none shadow-md"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="border border-black p-2 text-sm w-80 rounded-md outline-none shadow-md"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      className="btn"
                      onClick={(e) => handlePasswordChange(e)}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ResetPassword;
