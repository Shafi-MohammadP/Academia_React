import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import TutorCoursesView from "../../../Components/tutor/TutorCourseViewAndupdate";
import TutorCoursesDetails from "../../../Components/tutor/tutor-course-view/TutorCourses";

const coursesData = [
  {
    id: "01",
    title: "Web Design BootCamp-2022 for Beginners",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    // imgUrl: course1,
  },

  {
    id: "02",
    title: "Professional Graphics Design, PhotoShop, Adobe XD, Figma",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    // imgUrl: course2,
  },

  {
    id: "03",
    title: "UI/UX BootCamp for Beginners in 2022",
    lesson: 12,
    students: 12.5,
    rating: 5.9,
    // imgUrl: course3,
  },
];

function TutorCourses() {
  return (
    <>
      <TutorCoursesDetails />
    </>
  );
}

export default TutorCourses;
