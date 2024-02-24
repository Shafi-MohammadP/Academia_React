import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import CourseCard from "../../../Components/Student/CourseCard";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import { useSelector } from "react-redux";
import HeroSection from "../../../Components/Hero-Section/HeroSection";
import Features from "../../../Components/Student/Feature-Section/Futures";
import AboutUs from "../../../Components/common/about-us/AboutUs";
import AllCourses from "../../Student/all-courses/AllCourses";

const TutorHome = () => {
  const tutor = useSelector((state) => {
    if (state.user.userInfo.role === "tutor") return state.user.userInfo;
  });
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const apiUrl = `${BaseUrl}tutor/TutorCoursesView/${tutor.id}/`;
    axios
      .get(apiUrl)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          console.error("Data is not an array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);
  return (
    <>
      <HeroSection />
      <AllCourses />
      {/* <div className="bg-[#F8F8F8] p-6">
        <div className="container mx-auto">
          <div className="text-2xl">
            <h3 className="mb-4 text-black">Welcome To Academia</h3>
            <h1 className="mb-4 text-black font-bold">
              Best Online Education Expertise
            </h1>
            <p className="mb-4 text-black">
              “Research suggests that on average, students retain 25-60% more
              material when learning online compared to only 8-10% in a
              classroom.” – World Economic Forum
            </p>
            <Button variant="contained" color="primary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      <div className="container">
        <h3 className="">Your Courses</h3>
        <div className=" flex flex-wrap mt-8 gap-4">
          {courses.map((course, i) => (
            <>
              <CourseCard key={i} course={course} />
            </>
          ))}
        </div>
      </div> */}
      <Features />
      <AboutUs />
    </>
  );
};

export default TutorHome;
