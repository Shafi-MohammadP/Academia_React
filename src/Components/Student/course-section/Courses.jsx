import React from "react";
import { Container, Row, Col } from "reactstrap";
import CourseCard from "./CourseCard";
import { useState, useEffect } from "react";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";
import { Loader } from "../../Loader/Loader";
import { Link } from "react-router-dom";

const Courses = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const apiUrl = `${BaseUrl}course/courseList/`;
    const fetchCourses = () => {
      axios.get(apiUrl).then((res) => {
        setCourse(res.data);
      });
    };

    fetchCourses();
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="mb-5">
            <div className="course__top d-flex justify-content-between align-items-center">
              <div className="course__top__left w-50">
                <h2>Our Popular Courses</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  consequatur libero quod voluptatibus ullam quia quas, vitae
                  voluptatem recusandae reprehenderit!
                </p>
              </div>

              <div className="w-50 text-end">
                <Link to={"all-courses/"}>
                  {" "}
                  <button className="btn">See All</button>
                </Link>
              </div>
            </div>
          </Col>
          {course.map((item) => (
            <Col lg="4" md="6" sm="6">
              <CourseCard key={item.id} item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
