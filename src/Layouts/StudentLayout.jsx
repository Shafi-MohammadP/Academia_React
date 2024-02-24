import React from "react";
import Head from "../Components/header/Head";
import { Outlet } from "react-router-dom";
// import { StickyNavbar } from "../Components/Navbar/Navbar";
// import DemoNavbar from "../Components/Demo/DemoNavbar";
import StudentNavbar from "../Components/Navbar/StudentNavbar";
import Footer from "../Components/common/footer/Footer";

const StudentLayout = () => {
  return (
    <>
      <div className="overflow-x-hidden min-h-screen">
        {/* <Head /> */}
        {/* <StickyNavbar /> */}
        {/* <DemoNavbar /> */}
        {/* <StudentNavbar /> */}
        <Head />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default StudentLayout;
