import React, { useEffect, useState } from "react";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import CourseCard from "../../../Components/Student/CourseCard";
import axios from "axios";
import { BaseUrl } from "../../../Constants/Constants";
import HeroSection from "../../../Components/Hero-Section/HeroSection";
import Company from "../../../Components/Student/Company-Section/Company";
import Courses from "../../../Components/Student/course-section/Courses";
import Features from "../../../Components/Student/Feature-Section/Futures";
import FreeCourse from "../../../Components/Student/free-course-section/FreeCourse";
import AboutUs from "../../../Components/common/about-us/AboutUs";

const Home = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const apiurl = `${BaseUrl}course/courseList`;
    axios.get(apiurl).then((res) => {
      setCourses(res.data);
    });
  }, []);
  // console.log(courses, "lottaaaaaaaaaaaaaaaaaaaa");

  return (
    <>
      <HeroSection />
      <Company />
      <Courses />
      <Features />
      {/* <FreeCourse /> */}
      <AboutUs />
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

      <div className="container flex flex-wrap mt-8 gap-4">
        {courses.map((course, i) => (
          // console.log(course),
          <>
            <CourseCard key={i} course={course} />
          </>
        ))}
      </div> */}
    </>
  );
};

export default Home;
