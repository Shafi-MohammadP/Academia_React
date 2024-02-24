import React from "react";
import Head from "../Components/header/Head";
import { Outlet } from "react-router-dom";
import { TutorStickyNavbar } from "../Components/Navbar/TutorNavbar";
import TutorNavbarNew from "../Components/Navbar/TutorNavbarNew";
import Footer from "../Components/common/footer/Footer";

const TutorLayout = () => {
  return (
    <>
      <div className="overflow-x-hidden min-h-screen">
        {/* <Head /> */}
        <TutorStickyNavbar />
        {/* <TutorNavbarNew /> */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default TutorLayout;
