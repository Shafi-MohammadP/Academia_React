import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentRoutes from "./StudentRoutes/StudentRoutes";
import TutorLayout from "../Layouts/TutorLayout";
import TutorRoutes from "./TutorRoutes/TutorRoutes";
import { ToastContainer } from "react-toastify";
import UserSignUp from "../Components/common/userSignUp";
import TutorSignup from "../Components/common/TutorSignup";
import toast, { Toaster } from "react-hot-toast";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import CommonGoogle from "../Components/common/CommonGoogle";
import EmailCheck from "../Components/common/Emailcheck";
import CommonLogin from "../Components/common/commonLogin";
const MainRoutes = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login/*" element={<CommonLogin />} />
        <Route path="/student/Signup/" element={<UserSignUp />} />
        <Route path="/tutor/Signup/" element={<TutorSignup />} />
        <Route path="/googlelogin/" element={<CommonGoogle />} />
        <Route path="/emailcheck/" element={<EmailCheck />} />

        <Route path="/*" element={<StudentRoutes />} />
        <Route path="/tutor/*" element={<TutorRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default MainRoutes;
