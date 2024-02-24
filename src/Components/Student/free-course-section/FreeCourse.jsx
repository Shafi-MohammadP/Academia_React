import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import FreeCourseCard from "./FreeCourseCard";

import "./free-course.css";
import { BaseUrl } from "../../../Constants/Constants";
import axios from "axios";

const FreeCourse = () => {
  const [freeCourse, setFreeCourse] = useState([]);
  useEffect(() => {
    const apiUrl = `${BaseUrl}student/freeCourseView/`;
    const fetchFreeCourse = async () => {
      axios.get(apiUrl).then((res) => {
        setFreeCourse(res.data);
      });
    };
    fetchFreeCourse();
  }, []);
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h2 className="fw-bold">Our Free Courses</h2>
          </Col>

          {freeCourse.map((item) => (
            <Col lg="3" md="4" className="mb-4" key={item.id}>
              <FreeCourseCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FreeCourse;
