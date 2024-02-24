import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import TutorCourseCards from "./TutorCourseCards";
import { useSelector } from "react-redux";
import { BaseUrl } from "../../../Constants/Constants";

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

function TutorCoursesDetails() {
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
    const videoApiUrl = `${BaseUrl}`;
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex align-items-center justify-content-center">
              <div className="flex items-center">
                <h2>Your Courses</h2>
              </div>
            </div>
          </Col>
          {courses.map((item) => (
            <Col lg="4" md="6" sm="6">
              <TutorCourseCards key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <Container></Container>
    </section>
  );
}

export default TutorCoursesDetails;
