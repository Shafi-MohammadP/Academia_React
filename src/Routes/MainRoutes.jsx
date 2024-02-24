import React from "react";
import { Route, Routes } from "react-router-dom";
import StudentRoutes from "./StudentRoutes/StudentRoutes";
import TutorLayout from "../Layouts/TutorLayout";
import TutorRoutes from "./TutorRoutes/TutorRoutes";
import { ToastContainer } from "react-toastify";

import toast, { Toaster } from "react-hot-toast";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import CommonGoogle from "../Components/common/CommonGoogle";
import EmailCheck from "../Components/common/Emailcheck";
import StudentSignUp from "../Components/common/StudentSignUp";
import UsersLogin from "../Components/common/UsersLogin";
import TeacherSignUp from "../Components/common/TeacherSignUp";
const MainRoutes = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login/*" element={<UsersLogin />} />
        <Route path="/student/Signup/" element={<StudentSignUp />} />
        <Route path="/tutor/Signup/" element={<TeacherSignUp />} />
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
