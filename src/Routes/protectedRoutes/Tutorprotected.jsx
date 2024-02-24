import { jwtDecode } from "jwt-decode";
import React from "react";
import AdminRoutes from "../AdminRoutes/AdminRoutes";
import { Navigate, Outlet } from "react-router-dom";
import StudentRoutes from "../StudentRoutes/StudentRoutes";
import CommonLogin from "../../Components/common/commonLogin";

const Tutorprotected = () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    const decodedToken = jwtDecode(token);

    if (decodedToken.is_admin) {
      return <AdminRoutes />;
    } else {
      if (decodedToken.role === "tutor") {
        return <Outlet />;
      } else {
        return <StudentRoutes />;
      }
    }
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default Tutorprotected;
