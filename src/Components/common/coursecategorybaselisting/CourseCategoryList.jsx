import React, { useEffect } from "react";
import AllCourseCard from "../../Student/all-courses/AllCourseCard";
import { Col, Container, Row } from "reactstrap";
import { useLocation } from "react-router-dom";
import { Loader } from "../../Loader/Loader";

const CourseCategoryList = ({ categoryBase }) => {
  const location = useLocation();
  const courses = location.state.categoryBase;
  const category_name = location.state.categoryName;
  console.log(category_name);
  if (courses === undefined || courses === null) {
    return <Loader />;
  }

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="course__top d-flex align-items-center justify-content-center">
                <div className="flex items-center">
                  <h2> {category_name} Courses</h2>
                </div>
              </div>
            </Col>
            {courses.map((item) => (
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

export default CourseCategoryList;
