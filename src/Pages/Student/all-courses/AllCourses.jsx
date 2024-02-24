import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import Courses from "../../../Components/Student/course-section/Courses";
import AllCourseCard from "../../../Components/Student/all-courses/AllCourseCard";
import { Col, Container, Row } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { Loader } from "../../../Components/Loader/Loader";

const AllCourses = () => {
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    const fetchAllCourse = async () => {
      const apiUrl = `${BaseUrl}course/courseList/`;
      try {
        const response = await axios.get(apiUrl);
        setAllCourses(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error During Fetching All Courses", err);
      }
    };
    fetchAllCourse();
  }, []);
  // if (allCourses.length === 0) {
  //   return <Loader />;
  // }
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="course__top d-flex align-items-center justify-content-center">
                <div className="flex items-center">
                  <h2>Our Courses</h2>
                </div>
              </div>
            </Col>
            {allCourses.map((item) => (
              <Col lg="4" md="6" sm="6">
                <AllCourseCard key={item.id} item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AllCourses;
